import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode, type Ref, type SyntheticEvent } from 'react';
import { cn } from '../../../lib/cn';

export interface ControlSubsectionProps {
  ref?: Ref<HTMLDetailsElement>;
  title: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * One level of nesting below ControlSection — same disclosure
 * mechanism, deliberately quieter: no accent dot, no uppercase, just
 * a left rail so depth stays legible without adding chrome per level.
 * Nest as many as you like; each is independent, so "advanced" can
 * stay collapsed while its siblings are open.
 */
export function ControlSubsection({
  ref,
  title,
  defaultOpen = true,
  className,
  children
}: ControlSubsectionProps) {
  // See ControlSection: `open` is owned as state and driven by
  // onToggle, otherwise any re-render elsewhere in the panel
  // reasserts `defaultOpen` and undoes the user's click.
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setOpen(event.currentTarget.open);
  };

  return (
    <details
      ref={ref}
      open={open}
      onToggle={handleToggle}
      className={cn('group', className)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 pb-1.5 select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          size={12}
          className="text-foreground-dim shrink-0 transition-transform group-open:rotate-90"
        />
        <span className="text-foreground-muted truncate text-xs">{title}</span>
      </summary>
      <div className="border-border hidden min-h-0 flex-1 flex-col gap-3 overflow-y-auto border-l pb-3 pl-4 group-open:flex">
        {children}
      </div>
    </details>
  );
}
