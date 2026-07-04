import type { VariantProps } from 'class-variance-authority';
import type { LabelHTMLAttributes, Ref } from 'react';
import { cn } from '../../lib/cn';
import { labelVariants } from './Label.variants';

export type LabelProps = {
  /** Shows a colored "*" after the label text. */
  required?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLLabelElement>;
} & LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>

/**
 * Label — a plain <label>, colorable and sizable like every other form
 * primitive. Size is meaningful here (a label in a dense filter bar reads
 * smaller than one above a hero form field), so both `variant` and `size`
 * are exposed. Stateless: pass `htmlFor` and pair it with the field's `id`.
 */
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
