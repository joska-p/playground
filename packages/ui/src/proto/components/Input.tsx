import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { colorVar, type ColorVariant } from "../lib/colorVariant";

const wrapperVariants = cva(
  "input-wrapper bg-surface flex items-center gap-2 rounded-md px-3",
  {
    variants: {
      expandable: {
        true: "search-expandable",
        false: "w-full",
      },
    },
    defaultVariants: { expandable: false },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof wrapperVariants> {
  /** Focus-ring color token. Defaults to "primary". */
  variant?: ColorVariant;
  /** Icon or element rendered before the input (e.g. a search glyph). */
  leadingIcon?: ReactNode;
  /** Icon/button rendered after the input (e.g. an "open" action). */
  trailingAction?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Input
 * -----
 * Mobile-first: full width by default. `expandable` opts into the
 * desktop-oriented "grows on focus" enhancement — a pure CSS
 * :focus-within transition, no JS required.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      expandable,
      variant = "primary",
      leadingIcon,
      trailingAction,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(wrapperVariants({ expandable }), wrapperClassName)}
        style={{ ["--_ring" as string]: colorVar(variant), ...style }}
      >
        {leadingIcon && (
          <span className="text-foreground-dim flex-shrink-0 text-xs transition-colors">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "text-foreground placeholder:text-foreground-dim w-full bg-transparent py-2 text-[13px] outline-none",
            className
          )}
          {...props}
        />
        {trailingAction && (
          <span className="text-foreground-dim hover:text-foreground flex-shrink-0 text-xs transition-colors">
            {trailingAction}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
