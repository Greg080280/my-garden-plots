import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";

export interface ProductCardData {
  id: string;
  slug?: string;
  name: string;
  companyName: string;
  companyLocation?: string;
  image: string;
  price: number;          // MDL
  /** When true, render a small bow accent in the top-right corner. */
  highlight?: boolean;
}

interface Props {
  product: ProductCardData;
  onAdd?: (p: ProductCardData) => void;
  className?: string;
}

/** Product card (spec §4.4) — used by marketplace grid. */
export const ProductCard = ({ product, onAdd, className }: Props) => {
  const href = `/marketplace/${product.slug ?? product.id}`;
  return (
    <article className={cn("editorial-card group relative flex flex-col overflow-hidden", className)}>
      {product.highlight && (
        <BotanicalSVG
          name="bows/bow-small"
          className="absolute top-2 right-2 z-10 text-brown w-7 h-5"
        />
      )}

      <Link to={href} className="img-zoom block relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-col gap-1.5 p-4">
        <Link to={href} className="font-heading text-base font-semibold text-garden-900 hover:text-garden-700 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </Link>
        <p className="font-ui text-xs text-garden-700/65">
          by {product.companyName}{product.companyLocation && ` (${product.companyLocation})`}
        </p>
        <div className="hairline mt-2 pt-3 flex items-center justify-between">
          <span className="font-heading text-base font-bold text-garden-900">
            {product.price} MDL
          </span>
          <button
            type="button"
            onClick={() => onAdd?.(product)}
            className="press inline-flex items-center gap-1 h-8 px-3 rounded-md bg-garden-600 text-cream-soft hover:bg-garden-700 font-ui text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
            Coș
          </button>
        </div>
      </div>
    </article>
  );
};
