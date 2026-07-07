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
        'group/section border-border flex flex-none flex-col border-t pt-4 first:border-t-0 first:pt-0',
        className
      )}
      style={colorVarStyle(variant)}
    >
      <summary className="flex shrink-0 cursor-pointer list-none items-center gap-2 pb-3 select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          size={14}
          className="text-foreground-dim shrink-0 transition-transform group-open/section:rotate-90"
        />
        <span className="text-foreground-muted truncate text-xs font-semibold tracking-wider uppercase">
          {title}
        </span>
      </summary>

      {/* Content wrapper */}
      <div
        className={cn(
          'hidden min-h-0 flex-col gap-4 pb-3 group-open:flex group-open/section:flex',
          // Only the last open section grows
          'last-of-type:group-open/section:flex-1'
        )}
      >
        {children}
      </div>
    </details>
  );
}
