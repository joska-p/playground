import type { ColorControl as ColorControlType } from '../types';

export function ColorControl({ control }: { control: ColorControlType }) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <label className="text-muted-foreground text-xs font-medium select-none">
        {control.label}
      </label>
      <div className="border-border focus-within:ring-primary/40 relative h-8 w-8 overflow-hidden rounded-lg border shadow-sm focus-within:ring-2">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: control.value }}
        />
        <input
          type="color"
          value={control.value}
          disabled={control.disabled}
          aria-label={`${control.label} picker`}
          onChange={(e) => {
            control.onChange(e.target.value);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
