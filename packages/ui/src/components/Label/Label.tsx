import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { labelVariants } from "./labelVariants";

interface LabelProps
  extends ComponentProps<"label">,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

function Label({
  children,
  ref,
  className,
  variant,
  required,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(labelVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="ui:ml-1 ui:text-destructive">*</span>}
    </label>
  );
}

export { Label };
