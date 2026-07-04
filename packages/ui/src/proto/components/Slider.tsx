import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { colorVar, type ColorVariant } from "../lib/colorVariant";

export type SliderProps = {
  variant?: ColorVariant;
  /** Show min/max/current tick labels beneath the track. Defaults to true. */
  showTicks?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    { className, variant = "primary", showTicks = true, style, min = 0, max = 100, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          className={cn(
            "h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none",
            className
          )}
          style={{
            accentColor: colorVar(variant),
            background: "var(--foreground-dim)",
            ...style,
          }}
          {...props}
        />
        {showTicks && (
          <div className="text-foreground-dim mt-1 flex justify-between text-xs">
            <span>{min}</span>
            <span>{Math.round((Number(min) + Number(max)) / 2)}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    );
  }
);
Slider.displayName = "Slider";
