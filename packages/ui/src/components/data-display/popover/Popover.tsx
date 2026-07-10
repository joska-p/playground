import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { popoverVariants, type PopoverVariants } from './variants';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement>, PopoverVariants {
  trigger: ReactNode;
  children: ReactNode;
  widthClassName?: string;
  align?: 'left' | 'center';
  ref?: Ref<HTMLDivElement>;
}

export function Popover({
  trigger,
  children,
  className,
  widthClassName = 'w-60',
  align = 'center',
  variant = 'default',
  ref,
  ...props
}: PopoverProps) {
  return (
    <div
      ref={ref}
      className={cn('group relative inline-block', className)}
      {...props}
    >
      {trigger}
      <div
        className={cn(
          'pointer-events-none absolute bottom-[calc(100%+12px)] z-50 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100',
          align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0',
          widthClassName
        )}
      >
        <div
          className={cn(popoverVariants({ variant }))}
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
