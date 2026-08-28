import { type ReactNode } from 'react';
import { cn } from '../lib/cn';

interface ShellProps {
    children: ReactNode;
    className?: string;
}

function Shell({ children, className }: ShellProps) {
    return (
        <div
            className={cn(
                'grid h-dvh grid-rows-[1fr_auto] bg-background text-foreground',
                'md:grid-cols-[1fr_auto] md:grid-rows-none',
                className
            )}
        >
            {children}
        </div>
    );
}

interface ShellCanvasProps {
    children: ReactNode;
    className?: string;
}

function ShellCanvas({ children, className }: ShellCanvasProps) {
    return (
        <div className={cn('relative min-w-0 min-h-0 overflow-hidden', className)}>{children}</div>
    );
}

interface ShellPanelsProps {
    children: ReactNode;
    className?: string;
    position?: 'right' | 'left';
}

function ShellPanels({ children, className, position = 'right' }: ShellPanelsProps) {
    return (
        <aside
            className={cn(
                'flex flex-col min-h-0 overflow-y-auto',
                'max-h-[40dvh] border-t border-border',
                'md:max-h-none md:border-t-0 md:border-l md:w-80',
                position === 'left' ? 'md:border-l-0 md:border-r md:order-first' : '',
                className
            )}
        >
            {children}
        </aside>
    );
}

Shell.Canvas = ShellCanvas;
Shell.Panels = ShellPanels;

export { Shell, ShellCanvas, ShellPanels };
export type { ShellProps, ShellCanvasProps, ShellPanelsProps };
