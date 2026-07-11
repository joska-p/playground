import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { Spinner } from '../../widgets/spinner/Spinner';
import { sliderVariants, type SliderVariants } from './variants';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>, SliderVariants {
  loading?: boolean;
  showTicks?: boolean;
  onChange?: (value: number) => void;

  ref?: Ref<HTMLInputElement>;
}

export function Slider({
  className,
  variant,
  onChange,
  value,
  showTicks = true,
  loading = false,
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  ref,
  ...props
}: SliderProps) {
  if (loading)
    return (
      <div className={cn('flex items-center justify-center')}>
        <Spinner />
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <input
        onChange={handleChange}
        value={value}
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(sliderVariants({ variant }), className)}
        {...props}
      />
      {showTicks && (
        <div className="text-foreground mt-1 flex justify-between text-xs select-none">
          <span>{min}</span>
          <span>{Math.round((Number(min) + Number(max)) / 2)}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
