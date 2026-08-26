import { type ReactNode } from "react";

import { cn } from "../lib/cn";

interface PanelProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

function Panel({ title, children, className }: PanelProps) {
    return (
        <div
            className={cn(
                "flex flex-col h-full bg-card text-card-foreground",
                "container-[inline-size]",
                className,
            )}
        >
            {title && (
                <div className="shrink-0 px-4 py-3 border-b border-border text-muted-foreground font-semibold tracking-wide uppercase text-[10px]">
                    {title}
                </div>
            )}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                {children}
            </div>
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
                "shrink-0 px-4 py-3 border-b border-border text-muted-foreground font-semibold tracking-wide uppercase text-[10px]",
                className,
            )}
        >
            {children}
        </div>
    );
}

export { Panel, PanelHeader };
export type { PanelProps, PanelHeaderProps };
