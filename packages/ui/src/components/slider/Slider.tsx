import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";
import { sliderVariants } from "./sliderVariants.js";

interface SliderProps
  extends
    Omit<ComponentProps<"input">, "onChange" | "value">,
    VariantProps<typeof sliderVariants> {
  value?: number;
  onChange?: (value: number) => void;
}

function Slider({
  className,
  variant,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: SliderProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    onChange?.(newValue);
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
      {...props}
    />
  );
}

export { Slider };
