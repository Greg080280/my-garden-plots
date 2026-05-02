import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { BotanicalSVG } from "./BotanicalSVG";

/**
 * Decorative botanical frame (spec §4.8).
 * Wraps content with a hand-drawn oval frame for "elegant" moments —
 * success states, hero callouts, confirmation modals. Use sparingly.
 */
interface Props {
  children: ReactNode;
  className?: string;
  /** Frame color class. Default: garden-700. */
  frameClassName?: string;
}

export const DecorativeFrame = ({ children, className, frameClassName }: Props) => (
  <div className={cn("relative px-12 py-12", className)}>
    <BotanicalSVG
      name="frames/frame-bow"
      className={cn("absolute inset-0 w-full h-full", frameClassName ?? "text-garden-700")}
    />
    <div className="relative">{children}</div>
  </div>
);
