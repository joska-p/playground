import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { inputVariants } from "./inputVariants";

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {}

function Input({ ref, className, variant, type = "text", ...props }: InputProps) {
  return (
    <input className={cn(inputVariants({ variant, className }))} ref={ref} type={type} {...props} />
  );
}

export { Input };
