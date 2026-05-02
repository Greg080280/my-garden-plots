import { Link } from "react-router-dom";
import { MapPin, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { HDButton } from "@/components/decor/HDButton";

export interface LandCardData {
  id: string;
  slug?: string;
  name: string;
  region: string;
  city?: string;
  image: string;
  totalAreaM2: number;
  pricePerM2: number;
  availablePlots: number;
}

interface Props {
  land: LandCardData;
  className?: string;
}

/**
 * Land card (spec §4.2).
 * White card, rounded-2xl, image h-48, location chip, name, area · price,
 * available plots line, full-width primary CTA.
 */
export const LandCard = ({ land, className }: Props) => {
  const href = `/lands/${land.slug ?? land.id}`;
  return (
    <article className={cn(
      "editorial-card group flex flex-col overflow-hidden",
      className
    )}>
      <Link to={href} className="img-zoom block relative aspect-[4/3] overflow-hidden">
        <img
          src={land.image}
          alt={land.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream-soft/95 backdrop-blur-sm text-garden-900 font-ui text-xs font-medium">
          <MapPin className="h-3 w-3" strokeWidth={1.8} />
          {land.city ? `${land.city}, ${land.region}` : land.region}
        </span>
      </Link>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <Link to={href} className="font-heading text-xl font-semibold text-garden-900 leading-tight hover:text-garden-700 transition-colors">
            {land.name}
          </Link>
          <p className="mt-1 font-ui text-sm text-garden-700/70">
            {land.totalAreaM2.toLocaleString("ro-MD")} m² · {land.pricePerM2} MDL/m²
          </p>
        </div>

        <p className="inline-flex items-center gap-1.5 font-ui text-sm text-garden-700">
          <Sprout className="h-4 w-4" strokeWidth={1.8} />
          {land.availablePlots} loturi disponibile
        </p>

        <HDButton asChild variant="primary" className="w-full mt-1">
          <Link to={href}>Vezi detalii →</Link>
        </HDButton>
      </div>
    </article>
  );
};
