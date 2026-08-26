import { type VariantProps } from "class-variance-authority";
import { useId, type InputHTMLAttributes } from "react";

import { sliderVariants } from "./slider.variants";
import { cn } from "../lib/cn";
import { useControllableState } from "../lib/use-controllable-state";

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
    min = 0,
    max = 100,
    step = 1,
    ...props
}: SliderProps) {
    const id = useId();
    const [state, setState] = useControllableState(value, defaultValue, onChange);

    return (
        <div className="flex items-center gap-2 w-full">
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={state}
                onChange={(e) => {
                    setState(Number(e.target.value));
                }}
                className={cn(sliderVariants({ color }), className)}
                {...props}
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
