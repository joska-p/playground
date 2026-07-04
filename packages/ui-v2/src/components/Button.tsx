import type { ButtonHTMLAttributes, Ref } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { buttonVariants } from "./Button.variants";

/**
 * Button — React 19 pattern: `ref` is a plain prop, no `forwardRef` wrapper
 * needed. The component itself holds no state; it's a pure function of
 * props.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows an inline spinner and hides the label; button becomes inert. */
  loading?: boolean;
  /** Native title text used for the built-in CSS-only tooltip. */
  tooltip?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  size,
  loading,
  tooltip,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "button-loading",
        tooltip && "tooltip",
        className
      )}
      data-tooltip={tooltip}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
