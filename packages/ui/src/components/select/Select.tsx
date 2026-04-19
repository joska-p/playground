import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { selectVariants } from "./variants.js";

interface SelectProps
  extends ComponentProps<"select">, VariantProps<typeof selectVariants> {
  children: ReactNode;
}

/**
 * A primitive select component.
 * Use the Field component to add labels and helper text.
 */
function Select({ ref, className, variant, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full pr-6">
      <select
        ref={ref}
        className={cn(selectVariants({ variant, className }))}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/50">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export { Select };
