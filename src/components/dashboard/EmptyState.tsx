import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ScalloperFrame } from "./ScalloperFrame";

interface Props {
  illustration: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Friendly empty-state with illustration + CTA. */
export const EmptyState = ({ illustration, title, description, action, className }: Props) => (
  <ScalloperFrame tint="paper" className={cn("p-10 text-center", className)}>
    <div className="flex justify-center">
      <div className="h-32 w-32 grid place-items-center text-primary">{illustration}</div>
    </div>
    <h3 className="font-script text-3xl text-primary mt-4">{title}</h3>
    {description && <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{description}</p>}
    {action && <div className="mt-5 inline-flex">{action}</div>}
  </ScalloperFrame>
);
