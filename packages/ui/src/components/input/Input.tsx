import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { inputVariants } from "./inputVariants.js";

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
}

function Input({
  ref,
  className,
  variant,
  label,
  helperText,
  id,
  type = "text",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-foreground/80 text-xs font-bold tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, className }))}
        {...props}
      />
      {helperText && (
        <p
          className={cn(
            "text-xs italic",
            variant === "error" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Input };
