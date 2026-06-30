import type { ColorPaletteControl as ColorPaletteControlType } from '../types';

function ColorPaletteControl({ control }: { control: ColorPaletteControlType }) {
  return (
    <label>
      <input
        type="radio"
        name={control.name}
        value={control.value}
        checked={control.checked}
        onChange={(e) => control.onChange?.(e.target.value)}
        className="sr-only"
      />
      {control.colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="size-(--cell-size) shrink-0 transition-transform"
        />
      ))}
    </label>
  );
}

export { ColorPaletteControl };
