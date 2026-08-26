import { useState } from "react";

import { cn } from "../lib/cn";

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
    defaultOpen = true,
}: PanelSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    if (!collapsible) {
        return (
            <div className={cn("flex flex-col gap-3", className)}>
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
        <details open={defaultOpen} className={cn("group", className)}>
            <summary
                onClick={(e) => {
                    e.preventDefault();
                    setOpen((o) => !o);
                }}
                className="flex items-center justify-between cursor-pointer text-muted-foreground text-[10px] uppercase tracking-widest font-semibold select-none"
            >
                {label}
                <span
                    className={cn(
                        "transition-transform duration-200 text-[8px]",
                        open ? "rotate-180" : "",
                    )}
                >
                    ▼
                </span>
            </summary>
            <div
                className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 pt-3">{children}</div>
                </div>
            </div>
        </details>
    );
}

export { PanelSection };
export type { PanelSectionProps };
