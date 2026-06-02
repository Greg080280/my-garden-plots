/**
 * BotanicalSVG — render an inline hand-drawn SVG with `currentColor` theming.
 * SVGs are bundled via Vite (import.meta.glob with ?raw) so they work in any
 * environment (preview, prod, sandboxed iframes) without a network round-trip.
 *
 * Usage:
 *   <BotanicalSVG name="illustrations/watering-can" className="text-garden-700 w-44" />
 */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Eagerly import every SVG under src/svg as a raw string at build time.
const RAW_SVGS = import.meta.glob("/src/svg/**/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const lookup = (name: string): string => {
  const key = `/src/svg/${name}.svg`;
  return RAW_SVGS[key] ?? "";
};

interface Props {
  /** path relative to src/svg, no .svg extension. e.g. "icons/tomato" */
  name: string;
  className?: string;
  /** Optional accessible label (otherwise treated as decorative). */
  title?: string;
  /** Disable the pencil-sketch filter (e.g. for dividers/frames). */
  noSketch?: boolean;
}

export const BotanicalSVG = forwardRef<HTMLSpanElement, Props>(
  ({ name, className, title, noSketch }, ref) => {
    const markup = lookup(name);
    return (
      <span
        ref={ref}
        role={title ? "img" : "presentation"}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        className={cn(
          "inline-block [&>svg]:h-full [&>svg]:w-full",
          !noSketch && "[&>svg]:[filter:url(#pencil-sketch)]",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }
);
BotanicalSVG.displayName = "BotanicalSVG";
