import { Input } from '../../../form/input/Input';
import type { TextControl as TextControlType } from '../types';

export function TextControl({ control }: { control: TextControlType }) {
  return (
    <Input
      label={control.label}
      value={control.value}
      disabled={control.disabled}
      onChange={(e) => {
        control.onChange(e.target.value);
      }}
      fullWidth
    />
  );
}
