import type { VariantProps } from 'class-variance-authority';
import type { LabelHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { labelVariants } from './variants';

export type LabelProps = {
  /** Shows a colored "*" after the label text. */
  required?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLLabelElement>;
} & LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants>;

export function Label({
  className,
  variant,
  size,
  disabled = false,
  required,
  children,
  ref,
  ...props
}: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size, disabled }), className)}
      {...props}
    >
      {children}
      {required && (
        <span
          className="text-destructive"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
}
