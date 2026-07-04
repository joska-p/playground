import { Slider } from '../../../elements/slider/Slider';
import type { SliderControl as SliderControlType } from '../types';

export function SliderControl({ control }: { control: SliderControlType }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-muted-foreground text-xs font-medium select-none">
        {control.label}
      </label>
      <Slider
        value={control.value}
        disabled={control.disabled}
        min={control.min}
        max={control.max}
        step={control.step}
        onChange={control.onChange}
      />
    </div>
  );
}
