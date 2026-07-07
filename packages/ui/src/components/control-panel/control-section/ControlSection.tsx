import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode, type Ref, type SyntheticEvent } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';

export type ControlSectionProps = {
  ref?: Ref<HTMLDetailsElement>;
  title: ReactNode;
  variant?: ColorVariant;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
};

export function ControlSection({
  ref,
  title,
  variant = 'default',
  defaultOpen = true,
  className,
  children
}: ControlSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setOpen(event.currentTarget.open);
  };

  return (
    <details
      ref={ref}
      open={open}
      onToggle={handleToggle}
      className={cn(
        'group/section border-border flex min-h-0 flex-col border-t pt-4 first:border-t-0 first:pt-0', // ← added flex flex-col
        className
      )}
      style={colorVarStyle(variant)}
    >
      <summary className="flex flex-shrink-0 cursor-pointer list-none items-center gap-2 pb-3 select-none [&::-webkit-details-marker]:hidden">
        {' '}
        {/* ← flex-shrink-0 */}
        <ChevronRight
          size={14}
          className="text-foreground-dim shrink-0 transition-transform group-open/section:rotate-90"
        />
        <span className="text-foreground-muted truncate text-xs font-semibold tracking-wider uppercase">
          {title}
        </span>
      </summary>

      {/* Content wrapper - critical for flex behavior */}
      <div className="hidden min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-3 group-open:flex group-open/section:flex">
        {' '}
        {/* ← flex-1 + overflow-y-auto */}
        {children}
      </div>
    </details>
  );
}
