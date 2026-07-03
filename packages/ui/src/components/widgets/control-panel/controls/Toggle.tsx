import { Switch } from '../../../elements/switch/Switch';
import type { ToggleControl as ToggleControlType } from '../types';

export function ToggleControl({ control }: { control: ToggleControlType }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-muted-foreground text-xs">{control.label}</label>
      <Switch
        checked={control.value}
        disabled={control.disabled}
        onChange={(e) => {
          control.onChange(e.target.checked);
        }}
      />
    </div>
  );
}
