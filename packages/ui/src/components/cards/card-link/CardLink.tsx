import type { ComponentProps, CSSProperties, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { accentTokens } from '../accent-tokens/accentTokens';

export type CardLinkProps = {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  accent?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

/**
 * The anchor-rooted sibling of Card. Card wraps content that has its
 * own nested actions; CardLink is for cards where the entire surface
 * is the click target.
 *
 * The edge is a neon tube: a crisp inset line at accent saturation,
 * then two falloff rings (kept tight — this is a subtle glow, not a
 * sign). Lit softly at rest, a bit brighter and slightly wider on
 * hover, but the hover rings pull spread *in*, not out, so the glow
 * intensifies without smearing further across neighboring cards.
 */
export function CardLink({
  ref,
  href,
  accent = accentTokens.primary,
  className,
  style,
  children,
  ...props
}: CardLinkProps) {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-transparent bg-(--_color)/10',
        'bg-[color-mix(in_oklch,var(--_color)_6%,var(--card))] backdrop-blur-xs',
        // Rest: crisp inset line, two small rings, low strength.
        'shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--_color)_var(--glow-strength-rest),transparent),0_0_4px_-1px_color-mix(in_srgb,var(--_color)_var(--glow-strength-rest),transparent),0_0_10px_-3px_color-mix(in_srgb,var(--_color)_calc(var(--glow-strength-rest)*0.7),transparent),var(--shadow-sm)]',
        'transition-all duration-300 ease-out hover:-translate-y-0.5',
        'hover:bg-[color-mix(in_oklch,var(--_color)_10%,var(--card))]',
        // Hover: line + rings brighten, but blur/spread stay tight —
        // this is where "less spread" happens vs the earlier version.
        'hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--_color)_var(--glow-strength-hover),transparent),0_0_6px_-1px_color-mix(in_srgb,var(--_color)_var(--glow-strength-hover),transparent),0_0_16px_-4px_color-mix(in_srgb,var(--_color)_calc(var(--glow-strength-hover)*0.6),transparent),var(--shadow-md)]',
        'focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--_color)_70%,var(--ring))] focus-visible:outline-none',
        className
      )}
      style={{ '--_color': accent, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </a>
  );
}
