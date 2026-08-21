import { cn } from '../../../lib/cn';

import type { ReactNode } from 'react';

export interface ControlConditionalProps {
    when: boolean;
    className?: string;
    children: ReactNode;
}

/**
 * Fully controlled by `when` — no state owned here. Height collapses via the `grid-template-rows:
 * 0fr → 1fr` trick, so it's a plain CSS transition with no measuring.
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
