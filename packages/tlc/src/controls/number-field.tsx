import { useId, type InputHTMLAttributes } from "react";

import { cn } from "../lib/cn";
import { useControllableState } from "../lib/use-controllable-state";

interface NumberFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

function NumberField({
    value,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    className,
    ...props
}: NumberFieldProps) {
    const id = useId();
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    return (
        <input
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            value={state}
            onChange={(e) => {
                setState(Number(e.target.value));
            }}
            className={cn(
                "h-8 w-20 rounded-md border border-input bg-background px-2 text-xs font-mono text-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                className,
            )}
            {...props}
        />
    );
}

export { NumberField };
export type { NumberFieldProps };
