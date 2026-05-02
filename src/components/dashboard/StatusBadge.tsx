import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Status badge (spec §4.6).
 *
 *  pending     → accent-yellow/40 bg, garden-900 text   (⏳)
 *  active      → garden-100 bg,        garden-700 text  (✓)
 *  in_progress → accent-yellow,        garden-900       (🔄)
 *  done        → garden-600,           cream-soft       (✅)
 *  cancelled   → accent-pink,          garden-900       (✕)
 */
export type StatusKind =
  | "pending" | "active" | "in_progress" | "done" | "cancelled" | "warning" | "info";

interface Props {
  status: StatusKind;
  children?: ReactNode;
  className?: string;
  /** Show the small leading glyph (defaults true). */
  showIcon?: boolean;
}

const STYLES: Record<StatusKind, { cls: string; icon: string; label: string }> = {
  pending:     { cls: "bg-[#E8D26A]/40 text-garden-900",      icon: "⏳", label: "În așteptare" },
  active:      { cls: "bg-garden-100  text-garden-700",       icon: "✓",  label: "Activ" },
  in_progress: { cls: "bg-[#E8D26A]   text-garden-900",       icon: "🔄", label: "În progres" },
  done:        { cls: "bg-garden-600  text-cream-soft",       icon: "✅", label: "Finalizat" },
  cancelled:   { cls: "bg-[#E8C4D2]   text-garden-900",       icon: "✕",  label: "Anulat" },
  warning:     { cls: "bg-[#E8D26A]/60 text-garden-900",      icon: "⚠",  label: "Atenție" },
  info:        { cls: "bg-[#D5E3EA]   text-[hsl(205_45%_28%)]", icon: "ℹ", label: "Info" },
};

export const StatusBadge = ({ status, children, className, showIcon = true }: Props) => {
  const s = STYLES[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-ui font-medium",
      s.cls,
      className
    )}>
      {showIcon && <span aria-hidden>{s.icon}</span>}
      {children ?? s.label}
    </span>
  );
};

/** Map a Romanian status string to a kind. */
export const statusKind = (label: string): StatusKind => {
  const l = label.toLowerCase();
  if (l.includes("anul") || l.includes("refund")) return "cancelled";
  if (l.includes("final") || l.includes("livrat") || l.includes("recoltat") || l.includes("done")) return "done";
  if (l.includes("progres") || l.includes("creștere") || l.includes("growing") || l.includes("scheduled")) return "in_progress";
  if (l.includes("așt") || l.includes("pending") || l.includes("rezervat")) return "pending";
  if (l.includes("activ") || l.includes("paid") || l.includes("confirm")) return "active";
  return "info";
};
