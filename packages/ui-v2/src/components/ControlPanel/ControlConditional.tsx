import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ControlConditionalProps = {
  when: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Shows or folds away a run of ControlRows depending on `when` — e.g.
 * only reveal "noise seed" once "noise" is switched on. Fully
 * controlled: `when` comes from whatever state the app already has
 * (a Switch's `checked`, a Select's `value`), there's nothing owned
 * here — consistent with "stateless components, stateful hooks".
 *
 * Animated with the `grid-template-rows: 0fr → 1fr` trick, so it's a
 * plain CSS transition and the content's height (not just its
 * opacity) collapses to zero — no measuring, no JS, no layout jump.
 */
export function ControlConditional({ when, className, children }: ControlConditionalProps) {
  return (
    <div
      aria-hidden={!when}
      className={cn(
        'grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
        when ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className
      )}
    >
      <div className="flex flex-col gap-3 overflow-hidden">{children}</div>
    </div>
  );
}
