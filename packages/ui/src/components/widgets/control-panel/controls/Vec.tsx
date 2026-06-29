import { useEffect, useRef, useState } from 'react';
import type { Vec2Control, Vec3Control } from '../types';

type VecControl = Vec2Control | Vec3Control;

const AXIS_COLORS = ['text-red-400', 'text-green-400', 'text-blue-400'] as const;

function VecInput({
  label,
  value,
  color,
  step,
  min,
  max,
  onChange
}: {
  label: string;
  value: number;
  color: string;
  step: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.select();
  }, [isEditing]);

  const commit = () => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className={`font-mono text-[10px] font-bold ${color} shrink-0`}>{label}</span>
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') setIsEditing(false);
          }}
          step={step}
          className="bg-muted border-border text-foreground focus:ring-primary w-full rounded border px-1.5 py-1 font-mono text-xs tabular-nums focus:ring-1 focus:outline-none"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1">
      <span className={`font-mono text-[10px] font-bold ${color} shrink-0`}>{label}</span>
      <button
        type="button"
        onClick={() => {
          setEditValue(String(value));
          setIsEditing(true);
        }}
        className="text-foreground bg-muted border-border hover:bg-muted/80 w-full truncate rounded border px-1.5 py-1 text-left font-mono text-xs tabular-nums transition-colors"
      >
        {value}
      </button>
    </div>
  );
}

export function VecControl({ control }: { control: VecControl }) {
  const isVec3 = control.type === 'vec3';
  const labels = control.labels ?? (isVec3 ? ['x', 'y', 'z'] : ['x', 'y']);
  const step = control.step ?? 0.1;
  const min = control.min ?? -Infinity;
  const max = control.max ?? Infinity;

  const handleChange = (index: number, value: number) => {
    const newValue = [...control.value] as number[];
    newValue[index] = value;
    control.onChange(newValue as Vec2Control['value'] & Vec3Control['value']);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <div className="flex gap-1.5">
        {control.value.map((val, i) => (
          <VecInput
            key={labels[i]}
            label={labels[i]}
            value={val}
            color={AXIS_COLORS[i]}
            step={step}
            min={min}
            max={max}
            onChange={(v) => handleChange(i, v)}
          />
        ))}
      </div>
    </div>
  );
}
