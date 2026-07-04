import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { useSidebarContext } from './useSidebarContext';

export type SidebarMainProps = {
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function SidebarMain({ children, ref, className, ...props }: SidebarMainProps) {
  const { position } = useSidebarContext();
  const isRightOrBottom = position === 'right' || position === 'bottom';

  return (
    <div
      ref={ref}
      className={cn('relative min-h-0 min-w-0', isRightOrBottom && 'order-first', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { SidebarMain };
