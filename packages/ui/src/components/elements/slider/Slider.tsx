import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
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
  size,
  value,
  onChange,
  min: _min = 0,
  max: _max = 100,
  step: _step = 1,
  disabled,
  ...props
}: SliderProps) {
  const isControlled = value !== undefined;
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
      disabled={disabled}
      {...(isControlled ? { value } : { defaultValue: min + (max - min) / 2 })}
      onChange={(e) => {
        if (disabled) return;
        onChange?.(parseFloat(e.target.value));
      }}
      className={cn(sliderVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Slider };
export type { SliderProps };
