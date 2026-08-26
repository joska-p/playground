import { type VariantProps } from "class-variance-authority";
import { useId, type InputHTMLAttributes } from "react";

import { sliderVariants } from "./slider.variants";
import { cn } from "../../lib/cn";
import { useFieldContext } from "../../lib/field-context";
import { useControllableState } from "../../lib/use-controllable-state";

interface SliderProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            "onChange" | "value" | "color"
        >,
        VariantProps<typeof sliderVariants> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    showValue?: boolean;
}

function Slider({
    value,
    defaultValue = 0,
    onChange,
    color,
    showValue = true,
    className,
    min: minProp = 0,
    max: maxProp = 100,
    step: stepProp = 1,
    id: idProp,
    "aria-label": ariaLabel,
    ...props
}: SliderProps) {
    const fallbackId = useId();
    const field = useFieldContext();
    const id = idProp ?? field?.id ?? fallbackId;
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    const min = Number(minProp);
    const max = Number(maxProp);
    const step = Number(stepProp);

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                {...(props as Omit<typeof props, "aria-valuemax" | "aria-valuemin" | "aria-valuenow">)}
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={state}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={state as number}
                aria-label={ariaLabel}
                onChange={(e) => {
                    setState(Number(e.target.value));
                }}
                className={cn(sliderVariants({ color }), className)}
            />
            {showValue && (
                <span className="text-xs font-mono text-muted-foreground tabular-nums min-w-[3ch] text-right">
                    {state}
                </span>
            )}
        </div>
    );
}

export { Slider };
export type { SliderProps };
