import type { ComponentProps } from 'react';
import { cn } from '../../../lib/cn';

export type CardTitleProps = {} & ComponentProps<'h3'>;

/**
 * Renders `<h3>` — a card sits below the page/section heading in the outline. No polymorphism in
 * this lib.
 */
export function CardTitle({ className, children, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn('text-card-foreground font-semibold', className)}
            {...props}
        >
            {children}
        </h3>
    );
}
