import type { HTMLAttributes, Ref } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";
import { badgeVariants } from "./Badge.variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  variant?: ColorVariant;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * Badge — a single `--_color` custom property drives soft/solid/outline/dot
 * appearances (see globals.css). `variant` picks which semantic token feeds
 * that custom property. Stateless: pure props in, markup out.
 */
export function Badge({
  className,
  appearance,
  dot,
  variant = "default",
  style,
  ref,
  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ appearance, dot }), className)}
      style={colorVarStyle(variant, style)}
      {...props}
    />
  );
}
