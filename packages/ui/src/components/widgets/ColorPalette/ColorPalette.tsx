import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.js";
import { colorPaletteVariants } from "./colorPaletteVariants.js";

interface ColorPaletteProps
  extends Omit<ComponentProps<"label">, "onChange">, VariantProps<typeof colorPaletteVariants> {
  colors: string[];
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (palette: unknown) => void;
}

/**
 * A reusable Color Palette component using CVA for variants.
 */
function ColorPalette({
  ref,
  colors,
  name,
  value,
  checked,
  onChange,
  className,
  orientation,
  size,
  variant,
  ...props
}: ColorPaletteProps) {
  return (
    <label
      ref={ref}
      className={cn(
        colorPaletteVariants({
          orientation,
          size,
          variant,
          checked: checked,
          className,
        })
      )}
      {...props}
    >
      {onChange && (
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange?.(true)}
          className="sr-only"
        />
      )}
      {colors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          style={{ backgroundColor: color }}
          className="size-(--cell-size) shrink-0 transition-transform"
        />
      ))}
    </label>
  );
}

export { ColorPalette };
