import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { radioVariants } from './radioVariants';

type RadioProps = {} & ComponentProps<'input'> & VariantProps<typeof radioVariants>;

function Radio({ ref, className, variant, size, ...props }: RadioProps) {
  return (
    <input
      ref={ref}
      type="radio"
      className={cn(radioVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Radio };
