import { ChevronUp, SlidersHorizontal } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { controlPanelVariants, type ControlPanelVariants } from '../variants';

export type Position = 'top' | 'bottom' | 'left' | 'right';

export interface ControlPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, ControlPanelVariants {
  ref?: Ref<HTMLDivElement>;
  title?: ReactNode;
  defaultCollapsed?: boolean;
}

export function ControlPanel({
  ref,
  title = 'controls',
  variant = 'primary',
  position = 'right',
  size = 'sm',
  defaultCollapsed = false,
  className,
  children
}: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isVertical = position === 'left' || position === 'right';

  return (
    <aside
      ref={ref}
      data-collapsed={isCollapsed}
      data-position={position}
      className={cn(controlPanelVariants({ variant, position, size }), className)}
    >
      {/* Header - always visible */}
      <div className="flex items-center justify-between">
        <div className="text-foreground-muted w-fit truncate px-4 py-3 text-sm font-medium tracking-wide">
          {title}
        </div>
        <button
          onClick={handleToggle}
          className={cn(
            'flex w-full grow cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-right select-none',
            'text-foreground-muted hover:text-foreground text-left transition-colors',
            // For vertical collapsed: make it prominent
            isVertical &&
              'landscape:data-[collapsed=true]:bg-surface/98 landscape:data-[collapsed=true]:shadow-sm'
          )}
        >
          <ChevronUp
            size={16}
            className={cn(
              'text-foreground-dim ml-auto shrink-0 transition-transform',
              isCollapsed ? 'rotate-180' : ''
            )}
          />
        </button>
      </div>

      {/* Collapsed vertical icon fallback (portrait only) */}
      <div className="hidden h-full w-full items-center justify-center data-[position=left]:portrait:data-[collapsed=true]:flex data-[position=right]:portrait:data-[collapsed=true]:flex">
        <SlidersHorizontal size={20} />
      </div>

      {/* Content */}
      <div
        className={cn(
          'min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5',
          isCollapsed ? 'hidden' : 'flex'
        )}
      >
        {children}
      </div>
    </aside>
  );
}
