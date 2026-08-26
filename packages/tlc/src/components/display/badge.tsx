import { type VariantProps } from 'class-variance-authority';

import { badgeVariants } from './badge.variants';
import { cn } from '../../lib/cn';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({
    className,
    variant,
    size,
    dot = false,
    children,
    ref,
    ...props
}: BadgeProps & { ref?: React.Ref<HTMLSpanElement> }) {
    return (
        <span
            ref={ref}
            className={cn(badgeVariants({ variant, size, dot }), className)}
            {...props}
        >
            {children}
        </span>
    );
}

export { Badge };
export type { BadgeProps };
