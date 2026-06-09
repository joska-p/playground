import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { IconSpinner } from '../icons/components/IconSpinner';
import { buttonVariants } from './buttonVariants';

type ButtonProps = {
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
} & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

function Button({
  ref,
  className,
  children,
  variant,
  size,
  fullWidth,
  isLoading,
  loadingText,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && 'w-full'
      )}
      type={type}
      ref={ref}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <IconSpinner
            className={cn(
              'animate-spin',
              size === 'sm' && 'h-3 w-3',
              (size === 'md' || size === 'icon' || !size) && 'h-4 w-4',
              size === 'lg' && 'h-5 w-5'
            )}
          />
          {loadingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
