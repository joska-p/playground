import type { LabelHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { labelVariants, type LabelVariants } from './variants';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, LabelVariants {
  /** Shows a colored "*" after the label text. */
  required?: boolean;
  ref?: Ref<HTMLLabelElement>;
}

export function Label({
  className,
  variant = 'default',
  size = 'default',
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
      aria-disabled={disabled ?? undefined}
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
