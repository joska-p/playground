import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';
import { sliderVariants } from './sliderVariants';

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  helperText?: string;
  unit?: string;
} & Omit<ComponentProps<'input'>, 'onChange' | 'value'> &
  VariantProps<typeof sliderVariants>;

function Slider({
  ref,
  className,
  variant,
  layout,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  helperText,
  unit,
  id,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const helperId = `${sliderId}-helper`;
  const isHorizontal = layout === 'horizontal';

  const valueColorClass = cn('font-mono text-xs', {
    'text-primary': !variant || variant === 'primary',
    'text-secondary': variant === 'secondary',
    'text-accent': variant === 'accent',
    'text-destructive': variant === 'destructive',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    onChange?.(newValue);
  }

  return (
    <div className={cn(sliderVariants({ variant, layout, className }))}>
      {label && (
        <div
          className={cn('flex items-center gap-2', {
            'justify-between': !isHorizontal,
          })}
        >
          <label
            htmlFor={sliderId}
            className="text-foreground/80 text-xs whitespace-nowrap"
          >
            {label}
          </label>
          <span className={valueColorClass}>
            {value}
            {unit}
          </span>
        </div>
      )}

      <input
        ref={ref}
        type="range"
        id={sliderId}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        aria-valuetext={unit ? `${value}${unit}` : undefined}
        aria-describedby={helperText ? helperId : undefined}
        aria-label={!label ? (props['aria-label'] ?? 'Slider') : undefined}
        className={cn('cursor-pointer disabled:cursor-not-allowed', {
          'flex-1': isHorizontal,
          'mt-2 w-full': !isHorizontal,
        })}
        {...props}
      />

      {helperText && (
        <p
          id={helperId}
          className={cn(
            'text-xs italic',
            variant === 'destructive'
              ? 'text-destructive'
              : 'text-muted-foreground'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Slider };
