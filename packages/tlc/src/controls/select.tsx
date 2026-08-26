import { useId, type SelectHTMLAttributes } from "react";

import { cn } from "../lib/cn";
import { useControllableState } from "../lib/use-controllable-state";

interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options: { label: string; value: string }[];
}

function Select({
    value,
    defaultValue = "",
    onChange,
    options,
    className,
    ...props
}: SelectProps) {
    const id = useId();
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    return (
        <select
            id={id}
            value={state}
            onChange={(e) => {
                setState(e.target.value);
            }}
            className={cn(
                "h-8 rounded-md border border-input bg-background px-2 text-xs font-mono text-foreground appearance-none cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
                "[mask-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] [mask-size:12px] [mask-position:right_8px_center] [mask-repeat:no-repeat bg-muted-foreground",
                className,
            )}
            {...props}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

export { Select };
export type { SelectProps };
