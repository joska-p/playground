import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { helperTextVariants } from './HelperTextVariants';

export type HelperTextProps = ComponentProps<'p'> & VariantProps<typeof helperTextVariants>;

function HelperText({ ref, className, variant, ...props }: HelperTextProps) {
  return (
    <p
      ref={ref}
      className={cn(helperTextVariants({ variant, className }))}
      {...props}
    />
  );
}

export { HelperText };
