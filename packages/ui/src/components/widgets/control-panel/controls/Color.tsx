import { useRef, useState } from 'react';
import type { ColorControl as ColorControlType } from '../types';

export function ColorControl({ control }: { control: ColorControlType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commitEdit = () => {
    const hex = editValue.startsWith('#') ? editValue : `#${editValue}`;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      control.onChange(hex);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            maxLength={7}
            className="bg-muted border-border text-foreground focus:ring-primary w-20 rounded border px-2 py-0.5 font-mono text-xs focus:ring-1 focus:outline-none"
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditValue(control.value);
              setIsEditing(true);
            }}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded px-1.5 py-0.5 font-mono text-xs transition-colors duration-100"
          >
            {control.value}
          </button>
        )}

        <div className="relative">
          <div
            className="border-border h-8 w-8 cursor-pointer rounded-lg border shadow-sm transition-shadow hover:shadow-md"
            style={{ backgroundColor: control.value }}
          />
          <input
            type="color"
            value={control.value}
            onChange={(e) => control.onChange(e.target.value)}
            disabled={control.disabled}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
    </div>
  );
}
