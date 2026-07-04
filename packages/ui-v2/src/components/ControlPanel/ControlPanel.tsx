import { ChevronUp } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../lib/colorVariant';
import { controlPanelVariants, type ControlPanelVariantProps } from './ControlPanel.variants';

export type ControlPanelProps = {
  ref?: Ref<HTMLDetailsElement>;
  title?: ReactNode;
  variant?: ColorVariant;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
} & ControlPanelVariantProps

/**
 * ControlPanel is a pure layout shell — it doesn't know what a
 * "control" is, only where to put the group of them.
 *
 * Responsiveness is native, not JS: it's a `<details>` that collapses
 * to a swipe-up sheet on portrait/mobile, and force-opens as a fixed
 * sidebar in landscape. The body is `hidden` by default, `flex` when
 * `[open]` (the usual `group-open` disclosure pattern), and `!flex`
 * under `landscape:` — the `!important` beats `[open]` state entirely,
 * so landscape never depends on the toggle being clicked.
 *
 * `variant` paints exactly one thing, a left accent border, via
 * `--_color` — same mechanism as Card's glow, not a `cva` variant,
 * since only one property changes (§5.2).
 */
export function ControlPanel({
  ref,
  title = 'controls',
  variant = 'primary',
  dock,
  size,
  defaultOpen = true,
  className,
  children
}: ControlPanelProps) {
  return (
    <details
      ref={ref}
      open={defaultOpen}
      className={cn(controlPanelVariants({ dock, size }), 'group border-l-2', className)}
      style={{
        ...colorVarStyle(variant),
        borderLeftColor: 'var(--_color)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 select-none',
          '[&::-webkit-details-marker]:hidden'
        )}
      >
        <span className="text-foreground-muted truncate text-sm font-medium tracking-wide">
          {title}
        </span>
        <ChevronUp
          size={16}
          className="text-foreground-dim shrink-0 transition-transform group-open:rotate-180 landscape:hidden"
        />
      </summary>
      <div className="hidden flex-col gap-3 overflow-y-auto px-4 pb-4 group-open:flex">
        {children}
      </div>
    </details>
  );
}
