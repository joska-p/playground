import type { SelectControl as SelectControlType } from '../types';

export function SelectControl({ control }: { control: SelectControlType }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <select
        value={control.value}
        onChange={(e) => control.onChange(e.target.value)}
        disabled={control.disabled}
        className="bg-muted border-border text-foreground focus:ring-primary w-full appearance-none rounded-lg border bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[16px] bg-position-[right_8px_center] bg-no-repeat px-3 py-2 pr-8 text-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {control.options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
