import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { colorVar, type ColorVariant } from "../lib/colorVariant";

export type RadioProps = {
  variant?: ColorVariant;
  label?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant = "primary", label, style, disabled, id, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type="radio"
        id={id}
        disabled={disabled}
        className={cn("h-4 w-4 flex-shrink-0 cursor-pointer rounded-full", className)}
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
Radio.displayName = "Radio";
