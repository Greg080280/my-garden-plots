import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Timeline (spec §4.7) — five-stage horizontal timeline for the
 * "My plot" detail page. Done dots = garden-600, current = pulse,
 * future = garden-100.
 */

export interface TimelineStage {
  key: string;
  label: string;
  date?: string;
  /** Optional illustration above the dot (small SVG). */
  icon?: ReactNode;
}

interface Props {
  stages: TimelineStage[];
  /** 0-based index of the current stage. */
  currentStep: number;
  className?: string;
}

export const Timeline = ({ stages, currentStep, className }: Props) => (
  <div className={cn("relative w-full", className)}>
    <ol className="grid items-start" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map((s, i) => {
        const done = i < currentStep;
        const current = i === currentStep;
        const last = i === stages.length - 1;
        return (
          <li key={s.key} className="relative flex flex-col items-center text-center px-2 min-w-0">
            {/* Connector to next dot */}
            {!last && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-[18px] left-1/2 right-[-50%] h-[3px] rounded-full",
                  done ? "bg-garden-600" : "bg-garden-100"
                )}
              />
            )}

            {/* Optional illustration above dot */}
            {s.icon && (
              <div className={cn(
                "mb-1 h-7 w-7 grid place-items-center transition-colors",
                done && "text-garden-600",
                current && "text-garden-700",
                !done && !current && "text-garden-100"
              )}>
                {s.icon}
              </div>
            )}

            {/* Dot */}
            <div className="relative h-9 grid place-items-center z-10">
              {current && (
                <span className="absolute h-9 w-9 rounded-full bg-garden-600/30 animate-ping" />
              )}
              <span
                className={cn(
                  "relative h-4 w-4 rounded-full border-2 transition-all",
                  done && "bg-garden-600 border-garden-700",
                  current && "bg-garden-600 border-garden-700 ring-4 ring-garden-600/15",
                  !done && !current && "bg-cream border-garden-100"
                )}
              >
                {done && (
                  <Check className="absolute inset-0 m-auto h-3 w-3 text-cream-soft" strokeWidth={3} />
                )}
              </span>
            </div>

            <p
              className={cn(
                "mt-2 font-ui text-sm font-medium leading-tight",
                done && "text-garden-700",
                current && "text-garden-900 font-semibold",
                !done && !current && "text-garden-700/50"
              )}
            >
              {s.label}
            </p>
            {s.date && (
              <p className="mt-0.5 font-ui text-xs text-garden-700/55">{s.date}</p>
            )}
          </li>
        );
      })}
    </ol>
  </div>
);
