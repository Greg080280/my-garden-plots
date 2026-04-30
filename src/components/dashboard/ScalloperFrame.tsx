import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Soft background tint, default cream "card". */
  tint?: "card" | "paper" | "sage";
  /** Adds a tiny hover-bow flourish. */
  flourish?: boolean;
}

/**
 * Decorative card wrapper — soft shadow, olive border, rounded.
 * The visual companion to ScallopedFrame for non-scalloped panels.
 */
export const ScalloperFrame = ({ children, className, tint = "card", flourish }: Props) => (
  <div
    className={cn(
      "relative rounded-2xl border shadow-paper transition-shadow",
      tint === "card" && "bg-card border-primary/25",
      tint === "paper" && "bg-paper border-primary/20",
      tint === "sage" && "bg-accent/40 border-primary/30",
      flourish && "hover:shadow-card",
      className
    )}
  >
    {flourish && (
      <span
        aria-hidden
        className="pointer-events-none absolute -top-3 -right-3 h-7 w-7 opacity-0 -rotate-12 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 13 Q 6 9 5 11 Q 4 15 12 13 Z" />
          <path d="M12 13 Q 18 9 19 11 Q 20 15 12 13 Z" />
          <circle cx="12" cy="13" r="1.2" />
          <path d="M11 14 L9 20" /><path d="M13 14 L15 20" />
        </svg>
      </span>
    )}
    {children}
  </div>
);
