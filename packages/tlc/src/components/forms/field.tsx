import { type ReactNode, useId } from 'react';
import { cn } from '../../lib/cn';
import { FieldContext } from '../../lib/field-context';

interface FieldProps {
    label: string;
    hint?: string;
    value?: ReactNode;
    children: ReactNode;
    className?: string;
}

function Field({ label, hint, value, children, className }: FieldProps) {
    const id = useId();

    return (
        <FieldContext value={{ id }}>
            <div
                className={cn(
                    'grid grid-cols-[1fr_auto] items-center gap-2',
                    '[container:inline-size]',
                    className
                )}
            >
                <div className="flex items-baseline gap-1.5 min-w-0">
                    <label
                        htmlFor={id}
                        className="text-muted-foreground text-xs font-medium truncate"
                    >
                        {label}
                    </label>
                    {value != null && (
                        <span className="text-muted-foreground/60 text-[10px] font-mono tabular-nums">
                            {value}
                        </span>
                    )}
                    {hint && <span className="text-muted-foreground/60 text-[10px]">{hint}</span>}
                </div>
                <div className="flex items-center">{children}</div>
            </div>
        </FieldContext>
    );
}

export { Field };
export type { FieldProps };
