import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { colorVarStyle, type ColorVariant } from "../lib/colorVariant";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant?: ColorVariant;
  label?: ReactNode;
}

/**
 * Switch — a native checkbox visually rebuilt as a toggle via the `.toggle`
 * class in globals.css (appearance:none + ::before thumb). Fully keyboard
 * accessible since it's still a real checkbox underneath.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, variant = "primary", label, style, disabled, id, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={id}
        disabled={disabled}
        className={cn("toggle", className)}
        style={colorVarStyle(variant, style)}
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
Switch.displayName = "Switch";
