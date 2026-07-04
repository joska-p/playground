import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { colorPaletteVariants } from './colorPaletteVariants';

type ColorPaletteProps = {
  colors: string[];
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (palette: string) => void;
} & Omit<ComponentProps<'label'>, 'onChange'> &
  VariantProps<typeof colorPaletteVariants>;

/**
 * A reusable Color Palette component using CVA for variants.
 */
function ColorPalette({
  ref,
  colors,
  name = 'palette',
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
          className
        })
      )}
      {...props}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        className="sr-only"
      />
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="size-(--cell-size) shrink-0 transition-transform"
        />
      ))}
    </label>
  );
}

export { ColorPalette };
