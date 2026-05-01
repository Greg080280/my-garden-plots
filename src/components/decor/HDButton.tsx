import { Button as ShadButton, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from "react";

/** Editorial button used across MyGarden — restrained, serif, square-ish corners. */
interface Props extends ButtonProps {
  /** Legacy: an icon image url is no longer rendered (kept for back-compat). */
  iconLeft?: string;
  tone?: "olive" | "cream" | "outline" | "ghost";
}
export const HDButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, tone = "olive", asChild, iconLeft: _iconLeft, ...rest }, ref) => {
    void _iconLeft;
    const toneClasses = {
      olive:
        "bg-primary text-primary-foreground hover:bg-primary-deep border border-primary",
      cream:
        "bg-transparent text-primary-deep border border-border hover:border-primary hover:bg-paper",
      outline:
        "bg-transparent text-primary-deep border border-primary hover:bg-primary/5",
      ghost:
        "bg-transparent text-primary hover:bg-accent/40 border border-transparent",
    }[tone];

    let content: React.ReactNode = children;
    if (asChild && isValidElement(children)) {
      const child = Children.only(children) as ReactElement<{ children?: React.ReactNode }>;
      content = cloneElement(child, { children: <>{child.props.children}</> });
    }

    return (
      <ShadButton
        ref={ref}
        asChild={asChild}
        className={cn(
          "press rounded-md font-display font-medium text-base tracking-normal gap-2 px-7 h-11",
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
