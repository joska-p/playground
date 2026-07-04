import { ChevronRight } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../lib/colorVariant';

export type ControlSectionProps = {
  ref?: Ref<HTMLDetailsElement>;
  title: ReactNode;
  variant?: ColorVariant;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A named, collapsible group of ControlRows (and nested
 * ControlSubsections) inside a ControlPanel. Native `<details>`, no
 * state — pass `open`/`onToggle` yourself if you ever need it
 * controlled, exactly like AccordionItem.
 *
 * `variant` only tints the small accent dot beside the title, via
 * `--_color` (§5.2) — it doesn't change the section's chrome.
 */
export function ControlSection({
  ref,
  title,
  variant = 'default',
  defaultOpen = true,
  className,
  children
}: ControlSectionProps) {
  return (
    <details
      ref={ref}
      open={defaultOpen}
      className={cn('group border-border border-t pt-3 first:border-t-0 first:pt-0', className)}
      style={colorVarStyle(variant)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 pb-2 select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          size={14}
          className="text-foreground-dim shrink-0 transition-transform group-open:rotate-90"
        />
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: 'var(--_color, var(--foreground-dim))' }}
        />
        <span className="text-foreground-muted truncate text-xs font-semibold tracking-wider uppercase">
          {title}
        </span>
      </summary>
      <div className="hidden flex-col gap-3 pb-1 pl-5 group-open:flex">{children}</div>
    </details>
  );
}
