import { cn } from "@/lib/utils";
import { Botanical, type BotanicalCategory } from "@/components/decor/Botanical";

interface Props {
  /** Defaults to a watering-can if not provided. */
  cat?: BotanicalCategory;
  slug?: string;
  label?: string;
  className?: string;
  /** Visual size of the illustration. Default md. */
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

/**
 * Charming loading state — a botanical illustration that sways gently with
 * a label below. Use in place of generic spinners on listings, dashboards
 * and content panels.
 */
export const LoadingState = ({
  cat = "tools",
  slug = "watering-can",
  label = "Se încarcă",
  className,
  size = "md",
}: Props) => (
  <div
    className={cn("flex flex-col items-center justify-center py-16 text-center", className)}
    role="status"
    aria-live="polite"
  >
    <div className={cn(SIZE[size], "text-primary animate-sway")}>
      <Botanical cat={cat} slug={slug} className="w-full h-full" />
    </div>
    <p className="mt-5 font-display italic text-base text-primary-deep">
      {label}
      <span className="loading-dots" aria-hidden>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  </div>
);

/**
 * Skeleton card grid — for use while listings load. Pairs visually with
 * editorial-card surfaces (Lands, Marketplace).
 */
export const CardGridSkeleton = ({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) => (
  <div className={cn("grid sm:grid-cols-2 xl:grid-cols-3 gap-8", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="editorial-card overflow-hidden animate-pulse"
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <div className="aspect-[4/3] bg-muted/60" />
        <div className="p-7 space-y-4">
          <div className="h-2.5 w-16 bg-muted/70 rounded-sm" />
          <div className="h-5 w-3/4 bg-muted/70 rounded-sm" />
          <div className="h-3 w-1/2 bg-muted/50 rounded-sm" />
          <div className="pt-5 border-t border-border/50 flex items-center justify-between">
            <div className="h-3 w-14 bg-muted/60 rounded-sm" />
            <div className="h-3 w-10 bg-muted/40 rounded-sm" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Skeleton row list — for sidebars / cart / task lists.
 */
export const RowListSkeleton = ({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) => (
  <ul className={cn("border-y border-border/60", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <li
        key={i}
        className="flex items-center gap-4 py-4 border-b border-border/40 last:border-0 animate-pulse"
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <div className="h-10 w-10 rounded-sm bg-muted/60 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/2 bg-muted/60 rounded-sm" />
          <div className="h-2.5 w-1/4 bg-muted/40 rounded-sm" />
        </div>
      </li>
    ))}
  </ul>
);
