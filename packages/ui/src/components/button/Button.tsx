import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { IconSpinner } from '../icon/IconSpinner';
import { buttonVariants } from './buttonVariants';

type ButtonProps = {
  isLoading?: boolean;
} & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

function Button({
  ref,
  className,
  children,
  variant,
  size,
  isLoading,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      ref={ref}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <IconSpinner className="h-4 w-4 animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
