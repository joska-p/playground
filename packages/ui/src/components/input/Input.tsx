import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { inputVariants } from "./inputVariants.js";

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function Input({
  ref,
  className,
  variant,
  label,
  helperText,
  isLoading,
  startIcon,
  endIcon,
  id,
  type = "text",
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs text-foreground/80"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="absolute left-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            {startIcon}
          </span>
        )}
        {isLoading && (
          <span className="absolute left-3 text-muted-foreground">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={isLoading || disabled}
          className={cn(
            inputVariants({ variant, className }),
            (startIcon || isLoading) && "pl-10",
            endIcon && "pr-10"
          )}
          {...props}
        />
        {endIcon && !isLoading && (
          <span className="absolute right-3 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            {endIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p
          className={cn(
            "text-xs italic",
            variant === "destructive" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Input };
