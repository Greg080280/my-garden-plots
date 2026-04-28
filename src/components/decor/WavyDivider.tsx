import { cn } from "@/lib/utils";

interface Props { className?: string; veg?: string; flip?: boolean }

/** Hand-drawn wavy section divider with a tiny veg illustration in the middle. */
export const WavyDivider = ({ className, veg, flip = false }: Props) => (
  <div className={cn("relative flex items-center justify-center my-10", className)} aria-hidden>
    <svg viewBox="0 0 600 24" className={cn("w-full max-w-3xl text-primary/60", flip && "rotate-180")}>
      <path
        d="M0 12 Q 30 2 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 T 540 12 T 600 12"
        fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      />
    </svg>
    {veg && (
      <img src={veg} alt="" className="absolute h-12 w-12 object-contain bg-background px-2" />
    )}
  </div>
);
