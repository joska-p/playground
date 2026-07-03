import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { HelperText } from '../../elements/helper-text/HelperText';
import { IconSpinner } from '../../icons/components/IconSpinner';
import { inputVariants } from './inputVariants';

type InputProps = {
  label?: string;
  helperText?: string;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
} & ComponentProps<'input'> &
  VariantProps<typeof inputVariants>;

function Input({
  ref,
  className,
  variant,
  label,
  helperText,
  isLoading,
  startIcon,
  endIcon,
  fullWidth,
  id,
  type = 'text',
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
      )}
      <div className={cn(inputVariants({ variant }), fullWidth && 'w-full')}>
        {isLoading ? (
          <IconSpinner className="text-muted-foreground size-4 shrink-0" />
        ) : (
          startIcon && (
            <span className="text-muted-foreground shrink-0 [&_svg]:size-4">{startIcon}</span>
          )
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={isLoading ?? disabled}
          className={cn(
            'placeholder:text-foreground-dim w-full bg-transparent py-2 outline-none',
            className
          )}
          {...props}
        />
        {endIcon && !isLoading && (
          <span className="text-muted-foreground shrink-0 [&_svg]:size-4">{endIcon}</span>
        )}
      </div>
      {helperText && (
        <HelperText variant={variant === 'destructive' ? 'destructive' : 'default'}>
          {helperText}
        </HelperText>
      )}
    </div>
  );
}

export { Input };
