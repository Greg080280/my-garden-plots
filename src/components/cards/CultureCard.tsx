import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HDButton } from "@/components/decor/HDButton";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";

export interface CultureCardData {
  id: string;
  slug?: string;
  name: string;
  /** Icon slug from /public/svg/icons (without extension). Falls back to seedling-generic. */
  iconSlug?: string;
  season: string;        // e.g. "Mai-Sept"
  daysToHarvest: number; // 90
  difficulty: 1 | 2 | 3; // 1-3 stars
}

const ICON_BY_SLUG: Record<string, string> = {
  rosii: "tomato", "rosii-cherry": "tomato", tomato: "tomato",
  morcov: "carrot", carrot: "carrot",
  varza: "cabbage", cabbage: "cabbage",
  ardei: "pepper", pepper: "pepper",
  vinete: "eggplant", eggplant: "eggplant",
  porumb: "corn", corn: "corn",
};

const renderStars = (n: 1 | 2 | 3) =>
  "⭐".repeat(n) + "☆".repeat(3 - n);

interface Props {
  culture: CultureCardData;
  className?: string;
  /** When provided, replaces the default "Adaugă la lot" CTA. */
  ctaLabel?: string;
  onCta?: () => void;
}

/**
 * Culture card (spec §4.3).
 * cream-soft background, rounded-2xl, garden-100 border,
 * SVG icon ~80px on top, name, sezon/recolta/dificultate, CTA.
 */
export const CultureCard = ({ culture, className, ctaLabel = "Adaugă la lot", onCta }: Props) => {
  const iconName = `icons/${culture.iconSlug ? (ICON_BY_SLUG[culture.iconSlug] ?? culture.iconSlug) : "seedling-generic"}`;
  return (
    <article className={cn(
      "flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-cream-soft border border-garden-100 shadow-paper hover:border-garden-400 hover:shadow-card transition-all",
      className
    )}>
      <BotanicalSVG name={iconName} className="text-garden-700 h-20 w-20" />

      <div>
        <Link
          to={`/cultures/${culture.slug ?? culture.id}`}
          className="font-heading text-lg font-semibold text-garden-900 hover:text-garden-700 transition-colors"
        >
          {culture.name}
        </Link>
      </div>

      <dl className="font-ui text-sm text-garden-700/80 space-y-0.5 leading-snug">
        <div>Sezon: <span className="text-garden-900">{culture.season}</span></div>
        <div>Recoltă: <span className="text-garden-900">{culture.daysToHarvest} zile</span></div>
        <div>Dificultate: <span className="text-garden-900">{renderStars(culture.difficulty)}</span></div>
      </dl>

      <HDButton variant="primary" hdSize="sm" className="mt-2" onClick={onCta}>
        {ctaLabel}
      </HDButton>
    </article>
  );
};
