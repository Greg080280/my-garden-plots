import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons/HandDrawn";

export interface TimelineStage {
  key: string;
  label: string;
  icon: ReactNode;
  /** Optional date label below */
  date?: string;
}

interface Props {
  stages: TimelineStage[];
  /** Index of the current stage (0-based). Stages before it are "done", after are "future". */
  currentStep: number;
  className?: string;
}

/**
 * The signature dashboard timeline:
 *  - 5 stages connected by a hand-drawn wavy line
 *  - Done stages: filled olive circle with check
 *  - Current stage: gentle pulsing ring
 *  - Future stages: faded with dashed border
 */
export const Timeline = ({ stages, currentStep, className }: Props) => {
  // Build a wavy SVG path connecting N evenly-spaced points.
  const n = stages.length;
  const padX = 100 / n / 2; // center each stage in its bucket
  const points = Array.from({ length: n }, (_, i) => padX + (i * 100) / n);
  const wavePath = (() => {
    let d = `M ${points[0]} 50 `;
    for (let i = 1; i < n; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const mid = (prev + curr) / 2;
      // alternate the wave above/below
      const dy = i % 2 === 0 ? -8 : 8;
      d += `Q ${mid} ${50 + dy} ${curr} 50 `;
    }
    return d;
  })();

  // Done portion of the wave (separate path, drawn over the faded one)
  const donePoints = points.slice(0, Math.max(1, currentStep + 1));
  const donePath = (() => {
    if (donePoints.length < 2) return "";
    let d = `M ${donePoints[0]} 50 `;
    for (let i = 1; i < donePoints.length; i++) {
      const prev = donePoints[i - 1];
      const curr = donePoints[i];
      const mid = (prev + curr) / 2;
      const dy = i % 2 === 0 ? -8 : 8;
      d += `Q ${mid} ${50 + dy} ${curr} 50 `;
    }
    return d;
  })();

  return (
    <div className={cn("relative w-full", className)}>
      {/* connector waves */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[50px] h-[28px] w-full -translate-y-1/2 pointer-events-none"
        aria-hidden
      >
        <path d={wavePath} stroke="hsl(var(--primary) / 0.25)" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="2 2.5" />
        {donePath && (
          <path d={donePath} stroke="hsl(var(--primary))" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        )}
      </svg>

      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {stages.map((s, i) => {
          const done = i < currentStep;
          const current = i === currentStep;
          return (
            <li key={s.key} className="flex flex-col items-center text-center px-1 min-w-0">
              <div className="relative h-[100px] grid place-items-center">
                {current && (
                  <span className="absolute h-20 w-20 rounded-full bg-primary/15 animate-ping" />
                )}
                <div
                  className={cn(
                    "relative h-16 w-16 rounded-full grid place-items-center transition-all",
                    done && "bg-primary text-primary-foreground border-2 border-primary-deep",
                    current && "bg-paper text-primary border-[2.5px] border-primary shadow-paper",
                    !done && !current && "bg-paper text-primary/45 border-2 border-dashed border-primary/35"
                  )}
                >
                  {done ? <CheckIcon size={30} weight={2} /> : s.icon}
                </div>
              </div>
              <p
                className={cn(
                  "mt-2 text-xs font-display font-bold leading-tight",
                  done && "text-primary",
                  current && "text-primary-deep",
                  !done && !current && "text-muted-foreground/70"
                )}
              >
                {s.label}
              </p>
              {s.date && (
                <p className="text-[10px] font-display text-muted-foreground mt-0.5">{s.date}</p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
