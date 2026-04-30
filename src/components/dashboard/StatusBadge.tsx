import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type StatusKind =
  | "pending"     // În așteptare
  | "active"      // În lucru / Activ
  | "done"        // Finalizat / Livrată
  | "cancelled"   // Anulat
  | "warning"     // atenție (mustard)
  | "info";       // info (sage)

interface Props {
  status: StatusKind;
  children: ReactNode;
  className?: string;
}

const STYLES: Record<StatusKind, string> = {
  pending:   "bg-[hsl(45_50%_88%)] text-[hsl(35_60%_30%)] border-[hsl(45_45%_60%)]",
  active:    "bg-[hsl(200_45%_88%)] text-[hsl(205_45%_28%)] border-[hsl(200_40%_60%)]",
  done:      "bg-accent text-primary-deep border-primary/50",
  cancelled: "bg-[hsl(10_40%_90%)] text-[hsl(8_45%_35%)] border-[hsl(10_40%_65%)]",
  warning:   "bg-[hsl(40_55%_85%)] text-[hsl(30_55%_28%)] border-[hsl(38_50%_55%)]",
  info:      "bg-secondary text-primary-deep border-primary/40",
};

/** Pill-shaped status badge with hand-drawn border feel. */
export const StatusBadge = ({ status, children, className }: Props) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 px-2.5 h-6 text-[11px] font-display font-bold rounded-full border",
      STYLES[status],
      className
    )}
  >
    {children}
  </span>
);

/** Map a Romanian-language reservation/order status string to a kind. */
export const statusKind = (label: string): StatusKind => {
  const l = label.toLowerCase();
  if (l.includes("aștept") || l.includes("rezervat")) return "pending";
  if (l.includes("lucru") || l.includes("expediat") || l.includes("creștere") || l.includes("plantat")) return "active";
  if (l.includes("final") || l.includes("livrat") || l.includes("recoltat") || l.includes("activ")) return "done";
  if (l.includes("anul")) return "cancelled";
  if (l.includes("arat") || l.includes("confirm")) return "info";
  return "info";
};
