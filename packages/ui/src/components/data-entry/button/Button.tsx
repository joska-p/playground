import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { buttonVariants } from './variants';

export type ButtonProps = {
  loading?: boolean;
  tooltip?: string;
  ref?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  loading,
  tooltip,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant, size }),
        loading && 'button-loading',
        tooltip && 'tooltip',
        className
      )}
      data-tooltip={tooltip}
      disabled={disabled ?? loading}
      aria-busy={loading ?? undefined}
      {...props}
    >
      {children}
    </button>
  );
}
