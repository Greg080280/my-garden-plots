import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Optional small inline SVG/icon to drop in the middle. */
  children?: React.ReactNode;
}

/** A wavy hand-drawn divider. */
export const SectionDivider = ({ className, children }: Props) => (
  <div className={cn("relative flex items-center justify-center my-8", className)} aria-hidden>
    <svg viewBox="0 0 600 18" className="w-full max-w-2xl text-primary/55" preserveAspectRatio="none">
      <path
        d="M0 9 Q 25 1 50 9 T 100 9 T 150 9 T 200 9 T 250 9 T 300 9 T 350 9 T 400 9 T 450 9 T 500 9 T 550 9 T 600 9"
        fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      />
    </svg>
    {children && (
      <span className="absolute bg-background px-3 text-primary">{children}</span>
    )}
  </div>
);
