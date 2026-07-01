import { useEffect, useRef, useState } from 'react';
import type { SliderControl as SliderControlType } from '../types';

function formatValue(value: number, step?: number): string {
  if (isNaN(value)) return '0'; // 👈 Safe execution fallback guard
  if (step === undefined || step >= 1) return String(Math.round(value));
  const decimals = Math.max(0, -Math.floor(Math.log10(step)));
  return value.toFixed(decimals);
}

export function SliderControl({ control }: { control: SliderControlType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const min = control.min ?? 0;
  const max = control.max ?? 1;
  const step = control.step ?? 0.01;
  const safeValue = control.value;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const commitEdit = () => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed)) {
      control.onChange(Math.min(max, Math.max(min, parsed)));
    }
    setIsEditing(false);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-muted-foreground text-xs font-medium select-none">
          {control.label}
        </label>
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => { setEditValue(e.target.value); }}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            step={step}
            min={min}
            max={max}
            className="bg-muted border-border text-foreground focus:ring-primary w-20 rounded border px-2 py-0.5 text-right font-mono text-xs tabular-nums focus:ring-1 focus:outline-none"
          />
        ) : (
          <button
            type="button"
            disabled={control.disabled} // 👈 Fixed: Disable click interactions if control state blocks edits
            onClick={() => {
              setEditValue(formatValue(safeValue, step));
              setIsEditing(true);
            }}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded px-1.5 py-0.5 font-mono text-xs tabular-nums transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formatValue(safeValue, step)}
          </button>
        )}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(e) => { control.onChange(parseFloat(e.target.value)); }}
        disabled={control.disabled}
        className="bg-muted-foreground/20 accent-primary [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary h-1.5 w-full cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
      />
    </div>
  );
}
