import { ChevronUp } from 'lucide-react';
import { useState, type ReactNode, type Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';
import { controlPanelVariants, type ControlPanelVariantProps } from '../variants';

export type ControlPanelProps = {
  ref?: Ref<HTMLDivElement>;
  title?: ReactNode;
  variant?: ColorVariant;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
} & ControlPanelVariantProps;

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
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <aside
      data-open={isOpen}
      ref={ref}
      className={cn(controlPanelVariants({ dock, size }), 'border-l-2', className)}
      style={{
        ...colorVarStyle(variant),
        borderLeftColor: 'var(--_color)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <div className="flex h-full min-h-0 w-full flex-col">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={cn(
            'flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 select-none',
            'w-full text-left'
          )}
        >
          <span className="text-foreground-muted truncate text-sm font-medium tracking-wide">
            {title}
          </span>
          <ChevronUp
            size={16}
            className={cn(
              'text-foreground-dim shrink-0 transition-transform',
              isOpen ? 'rotate-180' : ''
            )}
          />
        </button>
        <div className={cn('min-h-0 flex-1 flex-col gap-3 px-4 pb-1', isOpen ? 'flex' : 'hidden')}>
          {children}
        </div>
      </div>
    </aside>
  );
}
