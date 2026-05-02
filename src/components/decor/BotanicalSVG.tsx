/**
 * BotanicalSVG — render an inline hand-drawn SVG from /public/svg with
 * `currentColor` theming. Use this for ALL decorative illustrations from the
 * spec asset library so they inherit text color via Tailwind classes.
 *
 * Why not <img src="/svg/...">? Because external <img> tags can't inherit
 * currentColor. We fetch and inline once, then cache.
 *
 * Usage:
 *   <BotanicalSVG name="illustrations/watering-can" className="text-garden-700 w-44" />
 */
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const cache = new Map<string, string>();

interface Props {
  /** path relative to /public/svg, no .svg extension. e.g. "icons/tomato" */
  name: string;
  className?: string;
  /** Optional accessible label (otherwise treated as decorative). */
  title?: string;
}

export const BotanicalSVG = ({ name, className, title }: Props) => {
  const [markup, setMarkup] = useState<string>(cache.get(name) ?? "");

  useEffect(() => {
    if (cache.has(name)) {
      setMarkup(cache.get(name)!);
      return;
    }
    let cancelled = false;
    fetch(`/svg/${name}.svg`)
      .then(r => (r.ok ? r.text() : ""))
      .then(t => {
        if (cancelled) return;
        cache.set(name, t);
        setMarkup(t);
      })
      .catch(() => { /* ignore */ });
    return () => { cancelled = true; };
  }, [name]);

  return (
    <span
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("inline-block [&>svg]:h-full [&>svg]:w-full", className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
