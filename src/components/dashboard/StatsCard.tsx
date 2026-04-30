import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ScalloperFrame } from "./ScalloperFrame";

interface Props {
  /** Hand-drawn icon — pass a component instance, e.g. <SproutIcon size={36} /> */
  icon: ReactNode;
  label: string;
  value: string | number;
  /** Optional sub-line, e.g. "+12% față de luna trecută" */
  trend?: string;
  trendDir?: "up" | "down" | "flat";
  className?: string;
}

/** Numbers + label, with a generous illustrated icon corner. */
export const StatsCard = ({ icon, label, value, trend, trendDir = "flat", className }: Props) => (
  <ScalloperFrame tint="card" className={cn("p-5 group hover:shadow-card transition-shadow", className)} flourish>
    <div className="flex items-start gap-4">
      <div className="text-primary shrink-0 -mt-1">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-display font-medium text-muted-foreground uppercase tracking-wide truncate">{label}</p>
        <p className="font-script text-4xl text-primary-deep leading-tight mt-1">{value}</p>
        {trend && (
          <p className={cn(
            "text-xs font-display font-medium mt-1",
            trendDir === "up" && "text-primary",
            trendDir === "down" && "text-brown",
            trendDir === "flat" && "text-muted-foreground"
          )}>
            {trendDir === "up" && "↗ "}{trendDir === "down" && "↘ "}{trend}
          </p>
        )}
      </div>
    </div>
  </ScalloperFrame>
);
