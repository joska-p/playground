import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { colorVar, type ColorVariant } from '../../../lib/colorVariant';

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  /** Width of the popover panel. Defaults to "w-60". */
  widthClassName?: string;
  align?: 'left' | 'center';
  /** Colors a thin top accent strip on the panel. Defaults to neutral. */
  variant?: ColorVariant;
};

/**
 * Popover — hover-triggered via Tailwind's `group`/`group-hover`, the exact
 * mechanism as the source design (no JS, no portal, no positioning library).
 * Centered with `left-1/2 -translate-x-1/2`.
 */
export function Popover({
  trigger,
  children,
  className,
  widthClassName = 'w-60',
  align = 'center',
  variant = 'default'
}: PopoverProps) {
  return (
    <div className={cn('group relative inline-block', className)}>
      {trigger}
      <div
        className={cn(
          'pointer-events-none absolute bottom-[calc(100%+12px)] z-50 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100',
          align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0',
          widthClassName
        )}
      >
        <div
          className="bg-surface rounded-lg border-t-2 p-4"
          style={{ boxShadow: 'var(--shadow-lg)', borderTopColor: colorVar(variant) }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
