import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { badgeVariants } from './badgeVariants';

type BadgeProps = {
  color?: string;
} & ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, color = 'primary', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={{ '--_color': `var(--${color})` } as React.CSSProperties}
      {...props}
    >
      {variant === 'dot' && (
        <span
          className="mr-1 inline-block size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--${color})` }}
        />
      )}
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };
