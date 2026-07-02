import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { sliderVariants } from './sliderVariants';

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
} & Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'type'> &
  VariantProps<typeof sliderVariants>;

function Slider({
  ref,
  className,
  variant,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: SliderProps) {
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange?.(parseFloat(e.target.value))}
      className={cn(sliderVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Slider };
