import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

export interface ControlRowProps {
    label: ReactNode;
    value?: ReactNode;
    hint?: string;
    className?: string;
    children: ReactNode;
}

/** The atomic unit of the control panel — the one place portrait/landscape layout is decided. */
export function ControlRow({ label, value, hint, className, children }: ControlRowProps) {
    return (
        <div
            className={cn(
                'flex min-h-10 flex-col gap-2 landscape:flex-row landscape:items-center landscape:gap-3',
                className
            )}
        >
            <span
                className="text-foreground flex shrink-0 items-center justify-between gap-2 text-sm landscape:w-24"
                title={hint}
            >
                <span className="truncate">{label}</span>
                {value !== undefined && (
                    <span className="text-foreground ml-auto shrink-0 text-sm landscape:ml-2">
                        {value}
                    </span>
                )}
            </span>
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}
