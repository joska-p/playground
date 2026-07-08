import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { sliderVariants } from './variants';

const ACCENT_COLOR: Record<ColorVariant, string> = {
  default: 'var(--foreground-dim)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  ghost: 'var(--foreground)',
  outline: 'var(--foreground-dim)'
};

export type SliderProps = {
  variant?: ColorVariant;
  /** Show min/max/current tick labels beneath the track. Defaults to true. */
  showTicks?: boolean;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Slider({
  className,
  variant = 'primary',
  showTicks = true,
  style,
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
          'h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none',
          className
        )}
        style={{
          accentColor: ACCENT_COLOR[variant],
          background: 'var(--foreground-dim)',
          ...style
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
