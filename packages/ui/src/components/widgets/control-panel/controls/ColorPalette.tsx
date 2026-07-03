import { cn } from '../../../../utils/cn';
import { ColorPalette } from '../../color-palette/ColorPalette';
import type { ColorPaletteControl as ColorPaletteControlType } from '../types';
import { colorPaletteControlVariants } from './colorPaletteControlVariants';

export function ColorPaletteControl({ control }: { control: ColorPaletteControlType }) {
  return (
    <div className={cn(colorPaletteControlVariants())}>
      <label className="sr-only">{control.label}</label>

      <ColorPalette
        colors={control.colors}
        name={control.name}
        value={control.value}
        checked={control.checked}
        onChange={control.onChange}
        orientation={control.orientation}
        size={control.size}
      />
    </div>
  );
}
