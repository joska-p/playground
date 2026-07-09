import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { sliderVariants } from './variants';

export type SliderProps = {
  variant?: ColorVariant;
  showTicks?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange' | 'min' | 'max' | 'step'
>;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      variant = 'primary',
      showTicks = true,
      value,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;

    return (
      <div className={cn(sliderVariants({ variant }))}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'h-1.5 w-full cursor-pointer rounded-full outline-none',
            'bg-(--variant-color)',
            className
          )}
          value={isControlled ? value : undefined}
          onChange={(e) => {
            const numValue = Number(e.currentTarget.value);
            onChange?.(numValue);
          }}
          {...props}
        />
        {showTicks && (
          <div className="text-foreground-dim mt-1 flex justify-between text-xs select-none">
            <span>{min}</span>
            <span>{Math.round((min + max) / 2)}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
