import type { TextControl as TextControlType } from '../types';

export function TextControl({ control }: { control: TextControlType }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-muted-foreground text-xs font-medium select-none">
        {control.label}
      </label>
      <input
        value={control.value ?? ''}
        onChange={(e) => control.onChange(e.target.value)}
        disabled={control.disabled}
        className="bg-muted border-border text-foreground focus:ring-primary h-9 w-full rounded-lg border px-3 text-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
