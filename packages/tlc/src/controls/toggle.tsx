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
}

function Toggle({
    pressed,
    defaultPressed = false,
    onChange,
    variant,
    className,
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
            data-state={state ? "on" : "off"}
            onClick={() => {
                setState(!state);
            }}
            className={cn(toggleVariants({ variant }), className)}
            {...props}
        >
            <span
                className={cn(
                    "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200",
                    state ? "translate-x-4" : "translate-x-0",
                )}
            />
        </button>
    );
}

export { Toggle };
export type { ToggleProps };
