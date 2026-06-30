import { cn } from '../../../../utils/cn';
import type { ColorPaletteControl as ColorPaletteControlType } from '../types';

function ColorPaletteControl({ control }: { control: ColorPaletteControlType }) {
  return (
    <label
      className={cn(
        'border-border hover:ring-primary/50 has-checked:ring-primary flex w-fit cursor-pointer flex-wrap overflow-hidden border transition-all [--cell-size:--spacing(6)] hover:ring-4 has-checked:shadow-md has-checked:ring-4',
        { 'flex-col': control.orientation === 'vertical' }
      )}
    >
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
