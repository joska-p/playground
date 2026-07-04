import { ChevronRight } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';

export type ControlSubsectionProps = {
  ref?: Ref<HTMLDetailsElement>;
  title: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
};

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
  return (
    <details
      ref={ref}
      open={defaultOpen}
      className={cn('group', className)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 pb-1.5 select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          size={12}
          className="text-foreground-dim shrink-0 transition-transform group-open:rotate-90"
        />
        <span className="text-foreground-muted truncate text-xs">{title}</span>
      </summary>
      <div className="border-border hidden flex-col gap-2.5 border-l pb-1 pl-3 group-open:flex">
        {children}
      </div>
    </details>
  );
}
