import { useEffect, useRef, useState } from 'react';
import type { ColorControl as ColorControlType } from '../types';

export function ColorControl({ control }: { control: ColorControlType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus and cleanly auto-select all characters upon click interaction
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const commitEdit = () => {
    const hex = editValue.startsWith('#') ? editValue : `#${editValue}`;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      control.onChange(hex);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <label className="text-muted-foreground text-xs font-medium select-none">
        {control.label}
      </label>
      <div className="flex shrink-0 items-center gap-2">
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
            className="bg-muted border-border text-foreground focus:ring-primary h-7 w-20 rounded border px-1.5 text-center font-mono text-xs focus:ring-1 focus:outline-none"
          />
        ) : (
          <button
            type="button"
            disabled={control.disabled}
            onClick={() => {
              setEditValue(control.value);
              setIsEditing(true);
            }}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded px-1.5 py-0.5 font-mono text-xs transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {control.value}
          </button>
        )}

        {/* Improved wrapping layout tracking clear native focus ring borders */}
        <div className="border-border focus-within:ring-primary/40 relative h-8 w-8 overflow-hidden rounded-lg border shadow-sm focus-within:ring-2">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: control.value }}
          />
          <input
            type="color"
            value={control.value}
            onChange={(e) => control.onChange(e.target.value)}
            disabled={control.disabled}
            aria-label={`${control.label} picker`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
