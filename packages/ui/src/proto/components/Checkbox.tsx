import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { colorVar, type ColorVariant } from "../lib/colorVariant";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant?: ColorVariant;
  label?: ReactNode;
}

/**
 * Checkbox — native input, styled with `accent-color`. Works with zero CSS
 * at all (browsers render a default checkbox); the accent color is a
 * progressive enhancement on top.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant = "primary", label, style, disabled, id, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type="checkbox"
        id={id}
        disabled={disabled}
        className={cn("h-4 w-4 flex-shrink-0 cursor-pointer rounded", className)}
        style={{ accentColor: colorVar(variant), ...style }}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-center gap-2.5 text-[13px] select-none",
          disabled ? "pointer-events-none opacity-40" : "cursor-pointer"
        )}
      >
        {input}
        {label}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
