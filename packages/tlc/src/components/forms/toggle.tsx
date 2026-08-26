import { type VariantProps } from "class-variance-authority";
import { useId, type ButtonHTMLAttributes, type ReactNode } from "react";

import { toggleVariants } from "./toggle.variants";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/use-controllable-state";
import { Spinner } from "../display/spinner";

interface ToggleProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
        VariantProps<typeof toggleVariants> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onChange?: (pressed: boolean) => void;
    label?: ReactNode;
    loading?: boolean;
    "aria-label": string;
}

function Toggle({
    pressed,
    defaultPressed = false,
    onChange,
    variant,
    className,
    label,
    loading = false,
    disabled,
    "aria-label": ariaLabel,
    ...props
}: ToggleProps) {
    const id = useId();
    const [state, setState] = useControllableState(
        pressed,
        defaultPressed,
        onChange,
    );

    const toggle = (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={state}
            aria-busy={loading || undefined}
            aria-label={ariaLabel}
            data-state={state ? "on" : "off"}
            disabled={disabled || loading}
            onClick={() => {
                setState(!state);
            }}
            className={cn(toggleVariants({ variant }), className)}
            {...props}
        >
            {loading ? (
                <Spinner className="absolute inset-0 m-auto h-3.5 w-3.5 text-primary-foreground" />
            ) : (
                <span
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200",
                        state ? "translate-x-5" : "translate-x-0",
                    )}
                />
            )}
        </button>
    );

    if (!label) return toggle;

    return (
        <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-2.5 text-xs select-none"
        >
            {toggle}
            {label}
        </label>
    );
}

export { Toggle };
export type { ToggleProps };
