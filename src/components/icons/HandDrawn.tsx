/**
 * Hand-drawn line-art SVG icons in the MyGarden olive style.
 *
 * Every icon:
 *  - uses `currentColor` so it inherits via Tailwind text utilities
 *  - has slightly imperfect strokes (rounded caps, hand-shifted control points)
 *    to feel drawn rather than geometric
 *  - is 24×24 viewBox by default — set via the `size` prop or className
 */
import type { SVGProps } from "react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "stroke" | "fill"> {
  size?: number | string;
  /** Stroke width, default 1.6 */
  weight?: number;
}

const base = (p: IconProps) => ({
  width: p.size ?? 24,
  height: p.size ?? 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: p.weight ?? 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/* ── stage icons ───────────────────────────────────────────────────── */

export const KeyIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="8" cy="12" r="3.4" />
    <circle cx="8" cy="12" r="0.9" fill="currentColor" />
    <path d="M11.4 12 L20 12" />
    <path d="M16.5 12 L16.5 15" />
    <path d="M19.4 12 L19.4 14.4" />
  </svg>
);

export const ShovelIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M5 5 L13 13" />
    <path d="M11.5 11.2 Q 17.5 13 17 17 Q 13.2 17.5 11 11.7 Z" />
    <path d="M3.5 3.4 L5.6 5.5" />
    <path d="M3 6 L6 3" />
  </svg>
);

export const SproutIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 20 L12 13" />
    <path d="M12 14 Q 7 13 6 8 Q 11 8.5 12 13" />
    <path d="M12 13 Q 17 12 18 7 Q 13 7.5 12 12.5" />
    <path d="M8 20 L16 20" />
  </svg>
);

export const GrowingPlantIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 21 L12 9" />
    <path d="M12 14 Q 6.5 13 5.5 7 Q 11 7 12 13" />
    <path d="M12 11 Q 18 10 19 4 Q 13 4.5 12 10" />
    <circle cx="12" cy="6" r="1.6" />
    <circle cx="9" cy="9.5" r="1" />
    <circle cx="15" cy="8" r="1" />
    <path d="M7 21 L17 21" />
  </svg>
);

/** Basket overflowing with veg — for "Recoltat" */
export const HarvestBasketIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    {/* basket body */}
    <path d="M4.5 13 L19.5 13 L18 20 Q 18 21 17 21 L7 21 Q 6 21 6 20 Z" />
    <path d="M3.5 13 L20.5 13" />
    {/* weave hints */}
    <path d="M9 14 L9 20" />
    <path d="M12 14 L12 20" />
    <path d="M15 14 L15 20" />
    {/* veggies */}
    <circle cx="9" cy="11" r="1.8" />
    <path d="M9 9.2 Q 9.4 8 10 8" />
    <circle cx="13.2" cy="10.5" r="1.5" />
    <path d="M16 12 Q 16.5 9 18 8.5" />
    <path d="M11 11.5 L11.4 13" />
  </svg>
);

/* ── tools / utility ───────────────────────────────────────────────── */

export const WateringCanIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M5 9 L5 17 Q 5 18 6 18 L12 18 Q 13 18 13 17 L13 9 Z" />
    <path d="M13 11 L19 8 L20 9.5 L19 11" />
    <path d="M5 9 L13 9" />
    <path d="M7.5 7 Q 8.5 5.5 10.5 7" />
    <path d="M3 8.5 Q 1.5 9.5 2 11" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M4 20 Q 4 8 18 5 Q 19 16 7 19 Z" />
    <path d="M4 20 Q 9 14 16 7" />
  </svg>
);

export const BowIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 13 Q 6 9 5 11 Q 4 15 12 13 Z" />
    <path d="M12 13 Q 18 9 19 11 Q 20 15 12 13 Z" />
    <circle cx="12" cy="13" r="1.2" />
    <path d="M11 14 L9 20" />
    <path d="M13 14 L15 20" />
  </svg>
);

export const PlotGridIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
    <path d="M3.5 9 L20.5 9" />
    <path d="M3.5 15 L20.5 15" />
    <path d="M9 3.5 L9 20.5" />
    <path d="M15 3.5 L15 20.5" />
  </svg>
);

export const CoinsIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <ellipse cx="9" cy="8" rx="5.5" ry="2.5" />
    <path d="M3.5 8 L3.5 11 Q 3.5 13.5 9 13.5 Q 14.5 13.5 14.5 11 L14.5 8" />
    <ellipse cx="14.5" cy="14" rx="5.5" ry="2.5" />
    <path d="M9 14 L9 16 Q 9 18.5 14.5 18.5 Q 20 18.5 20 16 L20 14" />
  </svg>
);

export const FarmerHatIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 16 Q 12 13 21 16" />
    <path d="M6 16 Q 7 8 12 7 Q 17 8 18 16" />
    <path d="M9 11 Q 12 10 15 11" />
  </svg>
);

export const CrownIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 18 L5 8 L9 12 L12 6 L15 12 L19 8 L21 18 Z" />
    <path d="M3 18 L21 18" />
    <circle cx="12" cy="6" r="0.9" fill="currentColor" />
  </svg>
);

export const MagnifierIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15 L20 20" />
  </svg>
);

export const DoorIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M6 21 L6 4 Q 6 3 7 3 L17 4 Q 18 4.2 18 5 L18 21" />
    <path d="M4 21 L20 21" />
    <circle cx="14.5" cy="13" r="0.7" fill="currentColor" />
    <path d="M9 7 L15 7.5" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M6 16 Q 6 9 12 8.5 Q 18 9 18 16 Z" />
    <path d="M5 16 L19 16" />
    <path d="M10.5 19 Q 12 20.5 13.5 19" />
    <path d="M12 6.5 L12 8.5" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3.5 12 L12 4 L20.5 12" />
    <path d="M5.5 11 L5.5 20 L18.5 20 L18.5 11" />
    <path d="M10 20 L10 14 L14 14 L14 20" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" />
    <path d="M3.5 10 L20.5 10" />
    <path d="M8 3.5 L8 7" />
    <path d="M16 3.5 L16 7" />
    <circle cx="8" cy="14" r="0.7" fill="currentColor" />
    <circle cx="12" cy="14" r="0.7" fill="currentColor" />
    <circle cx="16" cy="14" r="0.7" fill="currentColor" />
  </svg>
);

export const BasketIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 9 L21 9 L19 19 Q 19 20 18 20 L6 20 Q 5 20 5 19 Z" />
    <path d="M8 9 L11 4" />
    <path d="M16 9 L13 4" />
    <path d="M9 13 L9 17" />
    <path d="M15 13 L15 17" />
    <path d="M12 13 L12 17" />
  </svg>
);

export const PeopleIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19 Q 4 13 9 13 Q 14 13 15 19" />
    <circle cx="17" cy="9.5" r="2.2" />
    <path d="M14.5 19 Q 16 14.5 21 15.5" />
  </svg>
);

export const ClipboardIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <rect x="5" y="4.5" width="14" height="16.5" rx="1.4" />
    <rect x="9" y="3" width="6" height="3" rx="0.6" />
    <path d="M8 11 L16 11" />
    <path d="M8 14 L14 14" />
    <path d="M8 17 L13 17" />
  </svg>
);

export const SettingsIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5 L12 5" />
    <path d="M12 19 L12 21.5" />
    <path d="M2.5 12 L5 12" />
    <path d="M19 12 L21.5 12" />
    <path d="M5.5 5.5 L7.5 7.5" />
    <path d="M16.5 16.5 L18.5 18.5" />
    <path d="M5.5 18.5 L7.5 16.5" />
    <path d="M16.5 7.5 L18.5 5.5" />
  </svg>
);

export const PackageIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 7.5 L12 3 L21 7.5 L12 12 Z" />
    <path d="M3 7.5 L3 16.5 L12 21 L12 12" />
    <path d="M21 7.5 L21 16.5 L12 21" />
    <path d="M7.5 5.2 L16.5 9.7" />
  </svg>
);

export const ChartIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M4 20 L20 20" />
    <path d="M7 20 L7 14" />
    <path d="M11 20 L11 9" />
    <path d="M15 20 L15 12" />
    <path d="M19 20 L19 6" />
    <path d="M3 5 Q 5 7 4 9" />
  </svg>
);

export const FlowerIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="12" cy="9" r="1.6" />
    <path d="M12 9 Q 9 6 11 4 Q 13 5 12 9" />
    <path d="M12 9 Q 15 6 13 4 Q 11 5 12 9" />
    <path d="M12 9 Q 9 12 11 14 Q 13 13 12 9" />
    <path d="M12 9 Q 15 12 13 14 Q 11 13 12 9" />
    <path d="M12 14 L12 21" />
    <path d="M12 18 Q 9 17 8 19" />
    <path d="M12 18 Q 15 17 16 19" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 4 L13.4 10.6 L20 12 L13.4 13.4 L12 20 L10.6 13.4 L4 12 L10.6 10.6 Z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 5 L12 19" />
    <path d="M5 12 L19 12" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M4 12 Q 8 16 11 18 Q 15 11 20 6" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}><path d="M14.5 5.5 Q 8 11 8 12 Q 8 13 14.5 18.5" /></svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}><path d="M9.5 5.5 Q 16 11 16 12 Q 16 13 9.5 18.5" /></svg>
);
