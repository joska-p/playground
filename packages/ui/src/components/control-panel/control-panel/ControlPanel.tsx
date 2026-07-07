import { ChevronUp, SlidersHorizontal } from 'lucide-react';
import { useState, type ReactNode, type Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { controlPanelVariants } from '../variants';

export type Position = 'top' | 'bottom' | 'left' | 'right';

export type ControlPanelProps = {
  ref?: Ref<HTMLDivElement>;
  title?: ReactNode;
  variant?: ColorVariant;
  position?: Position;
  size?: 'sm' | 'md' | 'lg';
  defaultCollapsed?: boolean;
  className?: string;
  children: ReactNode;
};

export function ControlPanel({
  ref,
  title = 'controls',
  variant = 'primary',
  position = 'right',
  size = 'md',
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
      <button
        onClick={handleToggle}
        className={cn(
          'flex w-full cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 select-none',
          'text-foreground-muted hover:text-foreground text-left transition-colors',
          // For vertical collapsed: make it prominent
          isVertical &&
            'landscape:data-[collapsed=true]:bg-surface/98 landscape:data-[collapsed=true]:shadow-sm'
        )}
      >
        <span className="text-foreground-muted truncate text-sm font-medium tracking-wide">
          {title}
        </span>
        <ChevronUp
          size={16}
          className={cn(
            'text-foreground-dim shrink-0 transition-transform',
            isCollapsed ? 'rotate-180' : ''
          )}
        />
      </button>

      {/* Collapsed vertical icon fallback (portrait only) */}
      <div className="hidden h-full w-full items-center justify-center data-[position=left]:portrait:data-[collapsed=true]:flex data-[position=right]:portrait:data-[collapsed=true]:flex">
        <SlidersHorizontal size={20} />
      </div>

      {/* Content */}
      <div
        className={cn(
          'min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4',
          isCollapsed ? 'hidden' : 'flex'
        )}
      >
        {children}
      </div>
    </aside>
  );
}
