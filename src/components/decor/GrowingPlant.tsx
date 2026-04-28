import { cn } from "@/lib/utils";

interface Props { className?: string; size?: number }
/** Animated growing-plant loader. */
export const GrowingPlant = ({ className, size = 64 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={cn("text-primary animate-sway", className)} aria-hidden>
    <path d="M32 60 L32 30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M32 42 Q 22 38 18 30 Q 26 28 32 36" fill="currentColor" opacity=".75" />
    <path d="M32 36 Q 42 32 46 24 Q 38 22 32 30" fill="currentColor" opacity=".75" />
    <circle cx="32" cy="22" r="4" fill="currentColor" />
    <path d="M22 60 L42 60" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
