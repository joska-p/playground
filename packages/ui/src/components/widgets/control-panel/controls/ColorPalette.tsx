import { ColorPalette } from '../../color-palette/ColorPalette';
import type { ColorPaletteControl as ColorPaletteControlType } from '../types';

export function ColorPaletteControl({ control }: { control: ColorPaletteControlType }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
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
