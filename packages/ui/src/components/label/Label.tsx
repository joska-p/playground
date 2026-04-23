import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { labelVariants } from "./labelVariants.js";

interface LabelProps extends ComponentProps<"label">, VariantProps<typeof labelVariants> {}

/**
 * A primitive label component used for form field accessibility.
 * Styled with a mono font to match the Creative Playground aesthetic.
 */
function Label({ children, ref, className, variant, size, ...props }: LabelProps) {
  return (
    <label className={cn(labelVariants({ variant, size, className }))} ref={ref} {...props}>
      {children}
    </label>
  );
}

export { Label };
