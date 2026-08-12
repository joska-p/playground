import type { ComponentProps } from 'react';
import { cn } from '../../../lib/cn';

export type CardTitleProps = {} & ComponentProps<'h3'>;

/**
 * A card's heading — typography only, no props beyond standard heading attributes. Renders `<h3>`
 * since a card is expected to sit below a page/section heading in the document outline; if that's
 * ever wrong for a given page, override with `asChild`-style composition isn't supported here (no
 * polymorphism in this library), so render your own heading in that one spot instead of reaching
 * for this component.
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
