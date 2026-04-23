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
}

/**
 * A themed range input for adjusting numerical values in experiments.
 */
function Slider({
  ref,
  className,
  variant,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  helperText,
  id,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    onChange?.(newValue);
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={sliderId}
          className="text-xs text-foreground/80"
        >
          {label}
        </label>
      )}
      <input
        type="range"
        id={sliderId}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={cn(sliderVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
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

export { Slider };
