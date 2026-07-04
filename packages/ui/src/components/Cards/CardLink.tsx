import type { ComponentProps, CSSProperties, Ref } from 'react';
import { cn } from '../../lib/cn';
import { accentTokens } from './accentTokens';

export type CardLinkProps = {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  /**
   * Any CSS color value — an `accentTokens` shortcut, your own
   * `"var(--category-generative)"`, a hex, whatever. This component
   * only ever assigns it to `--_color`; it never asserts what a
   * category or a color means. That's entirely the consumer's call.
   */
  accent?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

/**
 * The anchor-rooted sibling of Card. Card wraps content that has its
 * own nested actions (its `:has()` glow fires when `.card-actions` is
 * hovered); CardLink is for cards where the *entire surface* is the
 * click target — a project, a doc, a category tile — so the lift/glow
 * fires on the anchor itself, no nested actions needed.
 *
 * Ships only the shared skeleton: surface, lift-on-hover, focus ring,
 * and the `--_color` accent. Everything more specific — a gradient
 * line, a folded corner, a tilt attribute — belongs in whatever
 * composes this, layered on via `className`/`style`.
 *
 * The edge itself is a real neon tube, not a border-plus-shadow
 * compromise: a crisp `inset` line at near-full accent saturation,
 * then three widening, fading `box-shadow` rings around it — the same
 * falloff a physical tube casts on the wall behind it. Lit at rest
 * (a sign that's off doesn't read as a sign), brighter on hover. The
 * surface itself stays close to `--card` — dark and quiet — so the
 * color has somewhere to land instead of competing with a tinted
 * background.
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
        'group relative flex flex-col overflow-hidden rounded-lg border border-transparent',
        // Dark, quiet surface — a whisper of accent, not a wash. The
        // glow does the color work, the surface just stays out of its way.
        'bg-[color-mix(in_srgb,var(--_color)_8%,var(--card))]',
        // The neon tube: crisp inset line + three falloff rings, lit at rest.
        'shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--_color)_55%,transparent),0_0_10px_-2px_color-mix(in_srgb,var(--_color)_50%,transparent),0_0_24px_-4px_color-mix(in_srgb,var(--_color)_35%,transparent),var(--shadow-sm)]',
        'transition-all duration-300 ease-out hover:-translate-y-0.5',
        'hover:bg-[color-mix(in_srgb,var(--_color)_14%,var(--card))]',
        // Powered up: the tube brightens and the falloff reaches further out.
        'hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--_color)_90%,transparent),0_0_8px_0_color-mix(in_srgb,var(--_color)_75%,transparent),0_0_28px_2px_color-mix(in_srgb,var(--_color)_55%,transparent),0_0_64px_6px_color-mix(in_srgb,var(--_color)_35%,transparent),var(--shadow-lg)]',
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
