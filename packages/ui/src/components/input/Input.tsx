import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';
import { IconSpinner } from '../icons/components/IconSpinner';
import { inputVariants } from './inputVariants';

type InputProps = {
  label?: string;
  helperText?: string;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
  id,
  type = 'text',
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-foreground/80 text-xs"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="text-muted-foreground absolute left-3 [&_svg]:size-4 [&_svg]:shrink-0">
            {startIcon}
          </span>
        )}
        {isLoading && (
          <span className="text-muted-foreground absolute left-3">
            <IconSpinner className="h-4 w-4 animate-spin" />
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={isLoading ?? disabled}
          className={cn(
            inputVariants({ variant, className }),
            (startIcon ?? isLoading) && 'pl-10',
            endIcon && 'pr-10'
          )}
          {...props}
        />
        {endIcon && !isLoading && (
          <span className="text-muted-foreground absolute right-3 [&_svg]:size-4 [&_svg]:shrink-0">
            {endIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p
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

export { Input };
