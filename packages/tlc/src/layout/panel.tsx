import { type ReactNode } from 'react';
import { cn } from '../lib/cn';

interface PanelProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

function Panel({ title, children, className }: PanelProps) {
    return (
        <div
            className={cn(
                'flex flex-col h-full bg-card text-card-foreground rounded-lg border border-border',
                'container-[inline-size]',
                className
            )}
        >
            {title && <PanelHeader>{title}</PanelHeader>}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">{children}</div>
        </div>
    );
}

interface PanelHeaderProps {
    children: ReactNode;
    className?: string;
}

function PanelHeader({ children, className }: PanelHeaderProps) {
    return (
        <div
            className={cn(
                'shrink-0 px-4 py-3 border-b border-border text-muted-foreground font-semibold tracking-wide uppercase text-[10px]',
                className
            )}
        >
            {children}
        </div>
    );
}

Panel.Header = PanelHeader;

export { Panel, PanelHeader };
export type { PanelProps, PanelHeaderProps };
