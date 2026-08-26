import { type VariantProps } from "class-variance-authority";
import { useId, type ButtonHTMLAttributes } from "react";

import { toggleVariants } from "./toggle.variants";
import { cn } from "../lib/cn";
import { useControllableState } from "../lib/use-controllable-state";

interface ToggleProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
        VariantProps<typeof toggleVariants> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onChange?: (pressed: boolean) => void;
    "aria-label": string;
}

function Toggle({
    pressed,
    defaultPressed = false,
    onChange,
    variant,
    className,
    "aria-label": ariaLabel,
    ...props
}: ToggleProps) {
    const id = useId();
    const [state, setState] = useControllableState(
        pressed,
        defaultPressed,
        onChange,
    );

    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={state}
            aria-label={ariaLabel}
            data-state={state ? "on" : "off"}
            onClick={() => {
                setState(!state);
            }}
            className={cn(toggleVariants({ variant }), className)}
            {...props}
        >
            <span
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200",
                    state ? "translate-x-5" : "translate-x-0",
                )}
            />
        </button>
    );
}

export { Toggle };
export type { ToggleProps };
