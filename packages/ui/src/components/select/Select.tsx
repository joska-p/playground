import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { selectVariants } from "./selectVariants.js";

interface SelectProps extends ComponentProps<"select">, VariantProps<typeof selectVariants> {
  label?: string;
  helperText?: string;
  children: ReactNode;
}

function Select({
  ref,
  className,
  variant,
  label,
  helperText,
  id,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-foreground/80 text-xs font-bold tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(selectVariants({ variant, className }))}
          {...props}
        >
          {children}
        </select>
        <div className="text-foreground/50 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
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

export { Select };
