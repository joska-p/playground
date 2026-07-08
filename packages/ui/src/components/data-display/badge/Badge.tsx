import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { badgeVariants } from './variants';

export type BadgeProps = {
  variant?: ColorVariant;
  ref?: Ref<HTMLSpanElement>;
} & HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

/**
 * Badge — soft/solid/outline appearances with optional dot indicator.
 * Uses CVA compound variants for appearance × variant combinations.
 */
export function Badge({
  className,
  appearance,
  dot,
  variant = 'default',
  style,
  ref,
  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, appearance, dot }), className)}
      style={style}
      {...props}
    />
  );
}
