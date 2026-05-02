import { Button as ShadButton, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/**
 * MyGarden button (spec §4.1).
 * Variants: primary | secondary | ghost | danger
 * Sizes:    sm (h-8) · md (h-10) · lg (h-12)
 * Always rounded-md (8px).
 */
interface Props extends Omit<ButtonProps, "variant" | "size"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  hdSize?: "sm" | "md" | "lg";
  /** Legacy alias kept for back-compat with existing callers. */
  tone?: "olive" | "cream" | "outline" | "ghost";
  iconLeft?: string;
}

const VARIANT: Record<NonNullable<Props["variant"]>, string> = {
  primary:   "bg-garden-600 text-cream-soft hover:bg-garden-700 border border-garden-600",
  secondary: "bg-transparent text-garden-700 hover:bg-garden-100 border border-garden-600",
  ghost:     "bg-transparent text-garden-700 hover:bg-garden-100 border border-transparent",
  danger:    "bg-destructive text-destructive-foreground hover:opacity-90 border border-destructive",
};

const SIZE: Record<NonNullable<Props["hdSize"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-6 text-lg",
};

/** Map legacy `tone` (used across older pages) to new `variant`. */
const TONE_MAP: Record<NonNullable<Props["tone"]>, NonNullable<Props["variant"]>> = {
  olive:   "primary",
  cream:   "secondary",
  outline: "secondary",
  ghost:   "ghost",
};

export const HDButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant, tone, hdSize = "md", iconLeft: _iconLeft, ...rest }, ref) => {
    void _iconLeft;
    const v = variant ?? (tone ? TONE_MAP[tone] : "primary");
    return (
      <ShadButton
        ref={ref}
        className={cn(
          "press rounded-md font-ui font-medium tracking-tight gap-2 inline-flex items-center justify-center",
          VARIANT[v],
          SIZE[hdSize],
          className
        )}
        {...rest}
      >
        {children}
      </ShadButton>
    );
  }
);
HDButton.displayName = "HDButton";
