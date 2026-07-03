import { cn } from '../../../../utils/cn';
import { Switch } from '../../../elements/switch/Switch';
import type { ToggleControl as ToggleControlType } from '../types';
import { toggleControlVariants } from './toggleControlVariants';

export function ToggleControl({ control }: { control: ToggleControlType }) {
  return (
    <div className={cn(toggleControlVariants())}>
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
