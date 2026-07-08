import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { sliderVariants } from './variants';

export type SliderProps = {
  variant?: ColorVariant;
  showTicks?: boolean;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Slider({
  className,
  variant = 'primary',
  showTicks = true,
  min = 0,
  max = 100,
  ref,
  ...props
}: SliderProps) {
  return (
    <div className={cn(sliderVariants({ variant }))}>
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        className={cn(
          'h-1.5 w-full cursor-pointer rounded-full outline-none',
          'bg-(--variant-color)',
          className
        )}
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
