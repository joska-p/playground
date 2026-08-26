import { cn } from '../../lib/cn';
import type { ReactNode } from 'react';

interface FieldRowProps {
    label: ReactNode;
    value?: ReactNode;
    hint?: string;
    className?: string;
    children: ReactNode;
}

function FieldRow({ label, value, hint, className, children }: FieldRowProps) {
    return (
        <div
            className={cn(
                'flex min-h-7 flex-col gap-1.5 landscape:flex-row landscape:items-center landscape:gap-2',
                className
            )}
        >
            <span
                className="text-foreground flex shrink-0 items-center justify-between gap-1.5 text-xs landscape:w-20"
                title={hint}
            >
                <span className="truncate">{label}</span>
                {value !== undefined && (
                    <span className="text-foreground ml-auto shrink-0 text-xs landscape:ml-1.5">
                        {value}
                    </span>
                )}
            </span>
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}

export { FieldRow };
export type { FieldRowProps };
