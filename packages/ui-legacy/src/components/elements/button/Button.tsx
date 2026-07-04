import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { IconSpinner } from '../../icons/components/IconSpinner';
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
      className={cn(buttonVariants({ variant, size, className }), fullWidth && 'w-full')}
      type={type}
      ref={ref}
      disabled={isLoading ?? disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <IconSpinner className="size-4 animate-spin" />
          {loadingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
