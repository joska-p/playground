import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ControlGroupProps {
    children: ReactNode;
    className?: string;
}

function ControlGroup({ children, className }: ControlGroupProps) {
    return (
        <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    );
}

export { ControlGroup };
export type { ControlGroupProps };
