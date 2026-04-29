import { Button as ShadButton, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from "react";

/** Styled button used across MyGarden — olive, rounded, with optional hand-drawn icon. */
interface Props extends ButtonProps {
  iconLeft?: string; // image url
  tone?: "olive" | "cream" | "outline" | "ghost";
}
export const HDButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, iconLeft, tone = "olive", asChild, ...rest }, ref) => {
    const toneClasses = {
      olive:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-paper",
      cream:
        "bg-paper text-foreground border border-primary/40 hover:bg-accent",
      outline:
        "bg-transparent text-foreground border-[1.5px] border-primary hover:bg-primary/10",
      ghost: "bg-transparent text-foreground hover:bg-accent/60",
    }[tone];

    const icon = iconLeft ? (
      <img src={iconLeft} alt="" className="h-5 w-5 object-contain -ml-1" />
    ) : null;

    let content: React.ReactNode;
    if (asChild && isValidElement(children)) {
      const child = Children.only(children) as ReactElement<{ children?: React.ReactNode }>;
      content = cloneElement(child, {
        children: (
          <>
            {icon}
            {child.props.children}
          </>
        ),
      });
    } else {
      content = (
        <>
          {icon}
          {children}
        </>
      );
    }

    return (
      <ShadButton
        ref={ref}
        asChild={asChild}
        className={cn(
          "press rounded-full font-display font-semibold tracking-wide gap-2 px-6 h-11",
          toneClasses,
          className
        )}
        {...rest}
      >
        {content}
      </ShadButton>
    );
  }
);
HDButton.displayName = "HDButton";
