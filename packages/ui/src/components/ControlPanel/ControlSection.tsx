import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode, type Ref, type SyntheticEvent } from 'react';
import { cn } from '../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../lib/colorVariant';

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
  // `open` must be real state, not a re-passed prop: React treats
  // <details open> like a tracked property (same bucket as `value`/
  // `checked`), so it gets reasserted on every commit — not just when
  // the prop changes. Without local state, any unrelated re-render in
  // the panel (a slider dragging, a value updating) snaps this back
  // to `defaultOpen`, which reads as "the section won't open".
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
        'group/section border-border min-h-0 border-t pt-3 first:border-t-0 first:pt-0',
        className
      )}
      style={colorVarStyle(variant)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 pb-2 select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          size={14}
          className="text-foreground-dim shrink-0 transition-transform group-open/section:rotate-90"
        />
        <span className="text-foreground-muted truncate text-xs font-semibold tracking-wider uppercase">
          {title}
        </span>
      </summary>
      <div className="hidden min-h-0 flex-col gap-3 pb-1 group-open:flex group-open/section:flex">
        {children}
      </div>
    </details>
  );
}
