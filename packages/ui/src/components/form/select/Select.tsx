import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { HelperText } from '../../elements/helper-text/HelperText';
import { selectVariants } from './selectVariants';

export type SelectProps = {
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
} & ComponentProps<'select'> &
  VariantProps<typeof selectVariants>;

function Select({
  ref,
  className,
  variant,
  label,
  helperText,
  fullWidth = true,
  id,
  ...props
}: SelectProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={id}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(selectVariants({ variant }), className)}
        {...props}
      />
      {helperText && (
        <HelperText variant={variant === 'destructive' ? 'destructive' : 'default'}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}

export { Select };
