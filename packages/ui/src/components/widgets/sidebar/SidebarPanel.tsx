import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { useSidebarContext } from './useSidebarContext';

export type SidebarPanelProps = {
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function SidebarPanel({ children, ref, className, style, ...props }: SidebarPanelProps) {
  const { isOpen, position } = useSidebarContext();
  const isHorizontal = position === 'left' || position === 'right';
  const isRightOrBottom = position === 'right' || position === 'bottom';

  return (
    <div
      ref={ref}
      data-open={isOpen}
      className={cn(
        'bg-surface-raised flex flex-col overflow-hidden shadow-xs transition-all duration-300 ease-in-out',
        isHorizontal && (isOpen ? 'w-[var(--sidebar-width,280px)]' : 'w-0'),
        !isHorizontal && (isOpen ? 'h-[var(--sidebar-height,200px)]' : 'h-0'),
        isHorizontal && 'h-full',
        !isHorizontal && 'w-full',
        isRightOrBottom && 'order-last',
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export { SidebarPanel };
