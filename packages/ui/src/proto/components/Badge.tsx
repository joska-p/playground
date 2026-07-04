import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      appearance: {
        soft: "badge-soft",
        solid: "badge-solid",
        outline: "badge-outline",
      },
      dot: {
        true: "badge-dot",
        false: "",
      },
    },
    defaultVariants: {
      appearance: "soft",
      dot: false,
    },
  }
);

export type BadgeProps = {
  variant?: ColorVariant;
} & HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

/**
 * Badge — a single `--_color` custom property drives soft/solid/outline/dot
 * appearances (see globals.css). `variant` picks which semantic token feeds
 * that custom property.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, appearance, dot, variant = "default", style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ appearance, dot }), className)}
        style={colorVarStyle(variant, style)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
