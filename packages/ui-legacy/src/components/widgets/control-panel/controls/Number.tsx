import { Input } from '../../../form/input/Input';
import type { NumberControl as NumberControlType } from '../types';

export function NumberControl({ control }: { control: NumberControlType }) {
  return (
    <Input
      label={control.label}
      type="number"
      value={control.value}
      disabled={control.disabled}
      min={control.min}
      max={control.max}
      step={control.step}
      onChange={(e) => {
        control.onChange(parseFloat(e.target.value));
      }}
      fullWidth
    />
  );
}
