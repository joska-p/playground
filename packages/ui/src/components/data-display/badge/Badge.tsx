import { badgeVariants, type BadgeVariants } from './variants';
import { cn } from '../../../lib/cn';

import type { HTMLAttributes, Ref } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
    ref?: Ref<HTMLSpanElement>;
}

export function Badge({
    className,
    variant = 'default',
    appearance = 'soft',
    size = 'md',
    dot = false,
    children,
    ref,
    ...props
}: BadgeProps) {
    return (
        <span
            ref={ref}
            className={cn(badgeVariants({ variant, appearance, size, dot }), className)}
            {...props}
        >
            {children}
        </span>
    );
}
