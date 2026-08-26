import { useId, type InputHTMLAttributes } from "react";

import {
    colorPaletteVariants,
    colorPaletteRingVariants,
    colorSwatchVariants,
    type ColorPaletteVariants,
} from "./color-palette.variants";
import { cn } from "../../lib/cn";

interface ColorPaletteProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">,
        ColorPaletteVariants {
    name: string;
    value: string;
    colors: string[];
    checked?: boolean;
    onChange?: (value: string) => void;
}

function ColorPalette({
    name,
    value,
    colors,
    checked = false,
    onChange,
    size,
    orientation,
    className,
    title,
    ...props
}: ColorPaletteProps) {
    const id = useId();

    return (
        <label
            htmlFor={id}
            title={title}
            className={cn(
                colorPaletteVariants({ size, orientation }),
                className,
            )}
        >
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => {
                    onChange?.(value);
                }}
                className="sr-only"
                {...props}
            />

            <div
                className={cn(
                    colorPaletteVariants({ size, orientation }),
                    "overflow-hidden rounded-[inherit]",
                )}
            >
                {colors.map((color) => (
                    <div
                        key={color}
                        className={colorSwatchVariants({ orientation })}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div
                className={cn(
                    colorPaletteRingVariants({ checked }),
                    "rounded-[inherit]",
                )}
            />
        </label>
    );
}

export { ColorPalette };
export type { ColorPaletteProps };
