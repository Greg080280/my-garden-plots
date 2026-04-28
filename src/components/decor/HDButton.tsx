import { Button as ShadButton, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/** Styled button used across MyGarden — olive, rounded, with optional hand-drawn icon. */
interface Props extends ButtonProps {
  iconLeft?: string; // image url
  tone?: "olive" | "cream" | "outline" | "ghost";
}
export const HDButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, iconLeft, tone = "olive", ...rest }, ref) => {
    const toneClasses = {
      olive:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-paper",
      cream:
        "bg-paper text-foreground border border-primary/40 hover:bg-accent",
      outline:
        "bg-transparent text-foreground border-[1.5px] border-primary hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-accent/60",
    }[tone];

    return (
      <ShadButton
        ref={ref}
        className={cn(
          "press rounded-full font-display font-semibold tracking-wide gap-2 px-6 h-11",
          toneClasses,
          className
        )}
        {...rest}
      >
        {iconLeft && <img src={iconLeft} alt="" className="h-5 w-5 object-contain -ml-1" />}
        {children}
      </ShadButton>
    );
  }
);
HDButton.displayName = "HDButton";
