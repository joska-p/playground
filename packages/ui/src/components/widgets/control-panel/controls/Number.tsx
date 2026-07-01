import { useEffect, useRef, useState } from 'react';
import type { NumberControl as NumberControlType } from '../types';

export function NumberControl({ control }: { control: NumberControlType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const step = control.step ?? 1;
  const min = control.min ?? -Infinity;
  const max = control.max ?? Infinity;

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

  const stepValue = (direction: 1 | -1) => {
    const next = control.value + step * direction;
    control.onChange(Math.min(max, Math.max(min, next)));
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground text-xs">{control.label}</label>
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
          className="bg-muted border-border text-foreground focus:ring-primary w-full rounded-lg border px-3 py-2 font-mono text-sm tabular-nums focus:ring-1 focus:outline-none"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <div className="border-border flex items-center overflow-hidden rounded-lg border">
        <button
          type="button"
          onClick={() => { stepValue(-1); }}
          disabled={control.disabled === true || control.value <= min}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2.5 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Decrease"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              d="M5 12h14"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            setEditValue(String(control.value));
            setIsEditing(true);
          }}
          className="text-foreground hover:bg-muted/50 flex-1 px-2 py-2 text-center font-mono text-sm tabular-nums transition-colors"
        >
          {Number.isInteger(step) ? control.value : control.value.toFixed(2)}
        </button>

        <button
          type="button"
          onClick={() => { stepValue(1); }}
          disabled={control.disabled === true || control.value >= max}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2.5 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Increase"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              d="M12 5v14m-7-7h14"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
