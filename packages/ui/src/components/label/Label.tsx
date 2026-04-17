import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { labelVariants } from "./labelVariants";

interface labelProps extends ComponentProps<"label">, VariantProps<typeof labelVariants> {}

function Label({ children, ref, className, variant, ...props }: labelProps) {
  return (
    <label className={cn(labelVariants({ variant, className }))} ref={ref} {...props}>
      {children}
    </label>
  );
}

export { Label };
