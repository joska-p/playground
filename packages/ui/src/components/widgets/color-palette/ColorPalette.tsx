import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVarStyle, type ColorVariant } from '../../../lib/colorVariant';
import { colorPaletteVariants } from './ColorPalette.variants';

// Explicitly extract variant props to solve the TypeScript error
type PaletteVariants = VariantProps<typeof colorPaletteVariants>;

export type ColorPaletteProps = {
  colors: string[];
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (palette: string) => void;
  variant?: ColorVariant;
  orientation?: PaletteVariants['orientation'];
  size?: PaletteVariants['size'];
  ref?: Ref<HTMLLabelElement>;
} & Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'>;

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
      className={cn(colorPaletteVariants({ orientation, size, className }))}
      style={{ boxShadow: 'var(--shadow-sm)', ...colorVarStyle(colorVariant, style) }}
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
          className="size-(--cell-size) shrink-0"
        />
      ))}
    </label>
  );
}

export { ColorPalette };
