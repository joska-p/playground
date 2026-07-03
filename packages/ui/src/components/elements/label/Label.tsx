import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { labelVariants } from './LabelVariants';

type LabelProps = ComponentProps<'label'> & VariantProps<typeof labelVariants>;

function Label({ ref, className, variant, size, ...props }: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Label };
