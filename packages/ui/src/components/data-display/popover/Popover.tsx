import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { popoverVariants } from './variants';

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  widthClassName?: string;
  align?: 'left' | 'center';
  variant?: ColorVariant;
};

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
          className={cn('bg-surface rounded-lg border-t-2 p-4', popoverVariants({ variant }))}
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
