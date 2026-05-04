import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Botanical, type BotanicalCategory } from "@/components/decor/Botanical";

interface Props {
  /** Either pass a custom illustration node OR (cat + slug) from the gallery. */
  illustration?: ReactNode;
  cat?: BotanicalCategory;
  slug?: string;
  /** Decorative tilt for the illustration (deg). */
  tilt?: number;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Visual size of the illustration. Default md. */
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "h-20 w-20",
  md: "h-28 w-28",
  lg: "h-36 w-36",
};

/**
 * Charming empty state — uses a hand-drawn botanical illustration plus a
 * dashed paper border to feel intentional rather than broken.
 */
export const EmptyState = ({
  illustration,
  cat,
  slug,
  tilt = -4,
  title,
  description,
  action,
  className,
  size = "md",
}: Props) => {
  const art =
    illustration ??
    (cat && slug ? (
      <Botanical cat={cat} slug={slug} className="w-full h-full text-primary/80" />
    ) : null);

  return (
    <div
      className={cn(
        "text-center px-8 py-14 border border-dashed border-border/80 rounded-md bg-paper/40",
        className
      )}
    >
      {art && (
        <div className="flex justify-center mb-5">
          <div
            className={cn(SIZE[size], "animate-sway")}
            style={{ transform: `rotate(${tilt}deg)` }}
          >
            {art}
          </div>
        </div>
      )}
      <h3 className="font-display text-2xl text-primary-deep italic">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6 inline-flex">{action}</div>}
    </div>
  );
};
