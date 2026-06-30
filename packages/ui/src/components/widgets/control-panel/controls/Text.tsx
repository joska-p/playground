import type { TextControl as TextControlType } from '../types';

export function TextControl({ control }: { control: TextControlType }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <input
        value={control.value}
        onChange={(e) => control.onChange(e.target.value)}
        className="bg-muted border-border text-foreground focus:ring-primary w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
