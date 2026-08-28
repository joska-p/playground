import { useState } from 'react';
import { cn } from '../lib/cn';

interface PanelSectionProps {
    label?: string;
    children: React.ReactNode;
    className?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
}

function PanelSection({
    label,
    children,
    className,
    collapsible = false,
    defaultOpen = true
}: PanelSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    if (!collapsible) {
        return (
            <div className={cn('flex flex-col gap-3', className)}>
                {label && (
                    <div className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold">
                        {label}
                    </div>
                )}
                {children}
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col', className)}>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => {
                    setOpen((o) => !o);
                }}
                className="flex items-center justify-between cursor-pointer text-muted-foreground text-[10px] uppercase tracking-widest font-semibold select-none transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
            >
                {label}
                <span
                    className={cn(
                        'transition-transform duration-150 text-[8px]',
                        open ? 'rotate-180' : ''
                    )}
                >
                    ▼
                </span>
            </button>
            <div
                className={cn(
                    'grid transition-[grid-template-rows] duration-150 ease-out',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 pt-3">{children}</div>
                </div>
            </div>
        </div>
    );
}

export { PanelSection };
export type { PanelSectionProps };
