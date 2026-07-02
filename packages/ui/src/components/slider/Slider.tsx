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
  value,
  onChange,
  min: _min = 0,
  max: _max = 100,
  step: _step = 1,
  ...props
}: SliderProps) {
  const controlled = !!value;
  const min = Number(_min);
  const max = Number(_max);
  const step = Number(_step);
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      {...(controlled ? { value } : { defaultValue: min + (max - min) / 2 })}
      onChange={(e) => onChange?.(parseFloat(e.target.value))}
      className={cn(sliderVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Slider };
