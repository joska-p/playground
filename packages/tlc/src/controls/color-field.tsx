import { useId, type InputHTMLAttributes } from "react";

import { cn } from "../lib/cn";
import { useFieldContext } from "../lib/field-context";
import { useControllableState } from "../lib/use-controllable-state";

interface ColorFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

function ColorField({
    value,
    defaultValue = "#fe8019",
    onChange,
    className,
    id: idProp,
    ...props
}: ColorFieldProps) {
    const fallbackId = useId();
    const field = useFieldContext();
    const id = idProp ?? field?.id ?? fallbackId;
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="color"
                value={state}
                onChange={(e) => {
                    setState(e.target.value);
                }}
                className={cn(
                    "h-8 w-8 cursor-pointer rounded-md border border-input bg-transparent p-0.5",
                    "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0",
                    "[&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-0",
                    className,
                )}
                {...props}
            />
            <span className="text-xs font-mono text-muted-foreground uppercase">
                {state}
            </span>
        </div>
    );
}

export { ColorField };
export type { ColorFieldProps };
