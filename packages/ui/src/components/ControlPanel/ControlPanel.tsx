import { ChevronUp } from 'lucide-react';
import { useState, type ReactNode, type Ref, type SyntheticEvent } from 'react';
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
} & ControlPanelVariantProps;

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
  // `open` is owned as state, driven by onToggle, rather than a
  // static `open={defaultOpen}` prop. React treats <details open>
  // as a tracked property (like `value`/`checked` on inputs): it
  // gets reasserted on every commit, not just when the prop value
  // changes. Any re-render elsewhere in the panel (a slider moving,
  // a value updating) would otherwise snap the panel back to
  // `defaultOpen` and undo whatever the user just clicked.
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setOpen(event.currentTarget.open);
  };

  return (
    <aside
      className={cn(controlPanelVariants({ dock, size }), 'border-l-2', className)}
      style={{
        ...colorVarStyle(variant),
        borderLeftColor: 'var(--_color)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <details
        ref={ref}
        open={open}
        onToggle={handleToggle}
        className="group flex h-full min-h-0 w-full flex-col"
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
        <div className="hidden min-h-0 flex-1 flex-col gap-3 px-4 pb-1 group-open:flex group-open/section:flex">
          {children}
        </div>
      </details>
    </aside>
  );
}
