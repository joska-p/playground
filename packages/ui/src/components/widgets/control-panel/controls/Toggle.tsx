import { cn } from '../../../../utils/cn';
import type { ToggleControl as ToggleControlType } from '../types';

export function ToggleControl({ control }: { control: ToggleControlType }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <button
        type="button"
        role="switch"
        aria-checked={control.value}
        onClick={() => {
          control.onChange(!control.value);
        }}
        disabled={control.disabled}
        className={cn(
          'relative h-[22px] w-10 rounded-full transition-colors duration-150',
          'focus-visible:ring-primary focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          control.value ? 'bg-primary' : 'bg-muted-foreground/30'
        )}
      >
        <span
          className={cn(
            'absolute top-[3px] left-0 h-4 w-4 rounded-full bg-white shadow-sm',
            'transition-transform duration-150',
            control.value ? 'translate-x-[22px]' : 'translate-x-[3px]'
          )}
        />
      </button>
    </div>
  );
}
