import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ControlRowProps {
  label: ReactNode;
  value?: ReactNode;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The atomic unit of the control panel: a label, an optional live
 * value readout, and the control itself — this is the one place
 * "orientation" is actually load-bearing. Portrait stacks the control
 * full-width below its label (thumb-friendly, plenty of width for a
 * Slider or Select). Landscape moves the label to a fixed-width
 * column and the control fills the rest, so a tall sidebar reads like
 * a compact form instead of a wall of stacked fields.
 *
 * Wrap whatever control you like — Slider, Select, Switch, an
 * Input — as `children`; ControlRow has no opinion on what's inside.
 */
export function ControlRow({ label, value, hint, className, children }: ControlRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5 landscape:flex-row landscape:items-center landscape:gap-3',
        className
      )}
    >
      <span
        className="text-foreground-muted flex shrink-0 items-center gap-1 text-xs landscape:w-24"
        title={hint}
      >
        <span className="truncate">{label}</span>
        {value !== undefined && (
          <span className="text-foreground-dim ml-auto shrink-0 font-mono text-[11px] landscape:ml-2">
            {value}
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
