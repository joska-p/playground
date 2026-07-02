import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { checkboxVariants } from './checkboxVariants';

type CheckboxProps = {} & ComponentProps<'input'> & VariantProps<typeof checkboxVariants>;

function Checkbox({ ref, className, variant, size, ...props }: CheckboxProps) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(checkboxVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Checkbox };
