import type { VariantProps } from 'class-variance-authority';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { badgeVariants } from './variants';

export type BadgeProps = {
  variant?: ColorVariant;
  ref?: Ref<HTMLSpanElement>;
  color?: string;
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
  ref,
  color,
  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, appearance, dot }), className)}
      style={{ '--surface-raised': color } as CSSProperties}
      {...props}
    />
  );
}
