import { cn } from '../../../../utils/cn';
import type { ColorPaletteControl as ColorPaletteControlType } from '../types';

export function ColorPaletteControl({ control }: { control: ColorPaletteControlType }) {
  // Map configuration profiles dynamically using valid utility definitions
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="sr-only">{control.label}</label>

      <label
        className={cn(
          'border-border hover:border-primary/50 hover:ring-primary/20 flex w-fit overflow-hidden rounded-lg border transition-all hover:ring-2',
          { 'ring-primary border-transparent shadow-sm ring-2': control.checked },
          control.orientation === 'vertical' ? 'flex-col' : 'flex-row',
          control.disabled ? 'pointer-events-none cursor-not-allowed opacity-40' : 'cursor-pointer'
        )}
      >
        <input
          type="radio"
          name={control.name}
          value={control.value}
          checked={control.checked}
          disabled={control.disabled}
          onChange={(e) => { control.onChange(e.target.value); }}
          className="sr-only"
        />
        {control.colors.map((color, index) => (
          <div
            key={`${color}-${String(index)}`}
            style={{ backgroundColor: color }}
            className={cn(
              'shrink-0 transition-transform hover:scale-105',
              sizeMap[control.size]
            )}
            title={color}
          />
        ))}
      </label>
    </div>
  );
}
