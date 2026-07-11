import type { VariantProps } from 'class-variance-authority';
import type { LabelHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { colorPaletteVariants, colorSwatchVariants, type ColorSwatchVariants } from './variants';

type PaletteVariants = VariantProps<typeof colorPaletteVariants>;
type SwatchVariants = VariantProps<typeof colorSwatchVariants>;

export interface ColorPaletteProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>, ColorSwatchVariants {
  colors: string[];
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (palette: string) => void;
  variant?: ColorVariant;
  orientation?: PaletteVariants['orientation'];
  size?: SwatchVariants['size'];
  ref?: Ref<HTMLLabelElement>;
}

function ColorPalette({
  colors,
  name = 'palette',
  value,
  checked,
  onChange,
  variant: colorVariant = 'primary',
  orientation,
  size,
  className,
  style,
  ref,
  ...props
}: ColorPaletteProps) {
  return (
    <label
      ref={ref}
      className={cn(colorPaletteVariants({ orientation, variant: colorVariant, className }))}
      style={style}
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
          className={cn(colorSwatchVariants({ size }))}
        />
      ))}
    </label>
  );
}

export { ColorPalette };
