import { Button } from '../../../elements/button/Button';
import type { ButtonControl as ButtonControlType } from '../types';

export function ButtonControl({ control }: { control: ButtonControlType }) {
  return (
    <Button
      variant={control.variant}
      onClick={control.onClick}
      disabled={control.disabled}
      fullWidth
    >
      {control.icon && <control.icon className="size-4 shrink-0" />}
      {control.label}
    </Button>
  );
}
