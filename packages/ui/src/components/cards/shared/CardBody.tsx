import type { ComponentProps } from 'react';
import { cn } from '../../../lib/cn';

export type CardBodyProps = {} & ComponentProps<'div'>;

/**
 * Layout-only wrapper for a card's main content — padding + vertical stacking, nothing else. No
 * props beyond standard div attributes; anything a specific card needs beyond that (a different
 * gap, a `flex-1` to push content to the bottom) comes in through `className`, which `cn`'s
 * tailwind-merge resolves against these defaults cleanly.
 */
export function CardBody({ className, children, ...props }: CardBodyProps) {
    return (
        <div
            className={cn('flex flex-col gap-4 p-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}
