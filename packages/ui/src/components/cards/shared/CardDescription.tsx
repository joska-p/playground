import { cn } from '../../../lib/cn';

import type { ComponentProps } from 'react';

export type CardDescriptionProps = {} & ComponentProps<'p'>;

/** No clamp by default — cards that want one pass `line-clamp-*` via className themselves. */
export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
    return (
        <p
            className={cn('text-foreground-dim text-sm', className)}
            {...props}
        >
            {children}
        </p>
    );
}
