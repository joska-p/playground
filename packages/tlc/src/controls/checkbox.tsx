import { type VariantProps } from "class-variance-authority";

import { checkboxVariants } from "./checkbox.variants";
import { cn } from "../lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof checkboxVariants> {
    label?: ReactNode;
    labelClassName?: string;
}

function Checkbox({
    className,
    labelClassName,
    variant = "default",
    label,
    disabled = false,
    id,
    ref,
    ...props
}: CheckboxProps & { ref?: React.Ref<HTMLInputElement> }) {
    const input = (
        <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={cn(checkboxVariants({ variant }), className)}
            {...props}
        />
    );

    if (!label) return input;

    return (
        <label
            htmlFor={id}
            className={cn(
                "flex items-center gap-2.5 text-sm select-none",
                disabled
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer",
                labelClassName,
            )}
        >
            {input}
            {label}
        </label>
    );
}

export { Checkbox };
export type { CheckboxProps };
