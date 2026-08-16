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
                'group relative flex flex-col overflow-hidden rounded-lg border border-transparent bg-(--variant-color)/10',
                'bg-[color-mix(in_oklch,var(--variant-color)_6%,var(--card))] backdrop-blur-xs',
                // Rest: crisp inset line, two small rings, low strength.
                'shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--variant-color)_var(--glow-strength-rest),transparent),0_0_4px_-1px_color-mix(in_srgb,var(--variant-color)_var(--glow-strength-rest),transparent),0_0_10px_-3px_color-mix(in_srgb,var(--variant-color)_calc(var(--glow-strength-rest)*0.7),transparent),var(--shadow-sm)]',
                'transition-all duration-300 ease-out hover:-translate-y-0.5',
                'hover:bg-[color-mix(in_oklch,var(--variant-color)_10%,var(--card))]',
                // Hover: line + rings brighten, but blur/spread stay tight —
                // this is where "less spread" happens vs the earlier version.
                'hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--variant-color)_var(--glow-strength-hover),transparent),0_0_6px_-1px_color-mix(in_srgb,var(--variant-color)_var(--glow-strength-hover),transparent),0_0_16px_-4px_color-mix(in_srgb,var(--variant-color)_calc(var(--glow-strength-hover)*0.6),transparent),var(--shadow-md)]',
                'focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--variant-color)_70%,var(--ring))] focus-visible:outline-none',
                className
            )}
            style={{ '--variant-color': accent, ...style } as CSSProperties}
            {...props}
        >
            {children}
        </a>
    );
}
