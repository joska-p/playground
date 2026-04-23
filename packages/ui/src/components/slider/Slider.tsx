import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "../../utils/cn.js";
import { sliderVariants } from "./sliderVariants.js";

interface SliderProps
  extends Omit<ComponentProps<"input">, "onChange" | "value">, VariantProps<typeof sliderVariants> {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  helperText?: string;
  unit?: string;
}

function Slider({
  ref,
  className,
  variant,
  layout,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  helperText,
  unit,
  id,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const hasLabel = label !== undefined;
  const isHorizontal = layout === "horizontal";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    onChange?.(newValue);
  }

  return (
    <div className={cn(sliderVariants({ variant, layout, className }))}>
      {label &&
        (isHorizontal ? (
          <div className="flex items-center gap-2">
            <label htmlFor={sliderId} className="text-foreground/80 text-xs whitespace-nowrap">
              {label}
            </label>
            <span
              className={cn("font-mono text-xs", {
                "text-primary": !variant || variant === "primary",
                "text-secondary": variant === "secondary",
                "text-accent": variant === "accent",
                "text-destructive": variant === "destructive",
              })}
            >
              {value}
              {unit}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <label htmlFor={sliderId} className="text-foreground/80 text-xs">
              {label}
            </label>
            <span
              className={cn("font-mono text-xs", {
                "text-primary": !variant || variant === "primary",
                "text-secondary": variant === "secondary",
                "text-accent": variant === "accent",
                "text-destructive": variant === "destructive",
              })}
            >
              {value}
              {unit}
            </span>
          </div>
        ))}
      {isHorizontal ? (
        <input
          type="range"
          id={sliderId}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="flex-1"
          ref={ref}
          {...props}
        />
      ) : (
        <input
          type="range"
          id={sliderId}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="mt-2 w-full"
          ref={ref}
          {...props}
        />
      )}
      {helperText && !hasLabel && (
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

export { Slider };
