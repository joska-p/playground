import type { ComponentProps, CSSProperties } from 'react';
import { cn } from '../../../lib/cn';

export type CardLinkProps = {
    href: string;
    accent?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

/**
 * Anchor-rooted sibling of Card — for cards where the whole surface is the click target (Card wraps
 * content that has its own nested actions).
 */
export function CardLink({
    href,
    accent = 'var(--primary)',
    className,
    style,
    children,
    ...props
}: CardLinkProps) {
    return (
        <a
            href={href}
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-lg border border-transparent',
                'bg-(--variant-color)/10 backdrop-blur-xs',
                'transition-all duration-300 ease-out hover:-translate-y-0.5',
                'focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none',
                className
            )}
            style={{ '--variant-color': accent, ...style } as CSSProperties}
            {...props}
        >
            {children}
        </a>
    );
}
