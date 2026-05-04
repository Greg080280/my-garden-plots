/**
 * Botanical — convenience wrapper around BotanicalSVG that knows the
 * gallery namespace. Use the category + slug from /public/svg/gallery.
 *
 *   <Botanical cat="vegetables" slug="tomato" className="text-garden-700 w-12 h-12" />
 */
import { BotanicalSVG } from "./BotanicalSVG";
import { cn } from "@/lib/utils";

export type BotanicalCategory =
  | "vegetables"
  | "tools"
  | "flowers"
  | "decor"
  | "accents";

interface Props {
  cat: BotanicalCategory;
  slug: string;
  className?: string;
  title?: string;
}

export const Botanical = ({ cat, slug, className, title }: Props) => (
  <BotanicalSVG
    name={`gallery/${cat}/${slug}`}
    className={cn("text-garden-700", className)}
    title={title}
  />
);
