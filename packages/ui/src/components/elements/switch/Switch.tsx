import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { switchVariants } from './switchVariants';

type SwitchProps = {} & ComponentProps<'input'> & VariantProps<typeof switchVariants>;

function Switch({ ref, className, variant, size, ...props }: SwitchProps) {
  return (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      className={cn(switchVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Switch };
