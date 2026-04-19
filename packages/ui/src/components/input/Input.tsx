import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { inputVariants } from "./variants.js";

interface InputProps
  extends ComponentProps<"input">, VariantProps<typeof inputVariants> {}

/**
 * A primitive input component.
 * Use the Field component to add labels and helper text.
 */
function Input({
  ref,
  className,
  variant,
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
