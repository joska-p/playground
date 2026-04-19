import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { sliderVariants } from "./variants.js";

interface SliderProps
  extends
    Omit<ComponentProps<"input">, "onChange" | "value">,
    VariantProps<typeof sliderVariants> {
  value?: number;
  onValueChange?: (value: number) => void;
}

/**
 * A primitive themed range input.
 */
function Slider({
  ref,
  className,
  variant,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: SliderProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    onValueChange?.(newValue);
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={cn(sliderVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
}

export { Slider };
