import { Select } from '../../../form/select/Select';
import type { SelectControl as SelectControlType } from '../types';

export function SelectControl({ control }: { control: SelectControlType }) {
  return (
    <Select
      label={control.label}
      value={control.value}
      disabled={control.disabled}
      onChange={(e) => {
        control.onChange(e.target.value);
      }}
      fullWidth
    >
      {control.options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
