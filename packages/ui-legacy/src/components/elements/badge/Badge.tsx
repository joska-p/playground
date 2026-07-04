import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { badgeVariants } from './badgeVariants';

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

function Badge({ ref, className, variant, ...props }: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
