import { Button } from '../../../elements/button/Button';
import type { ButtonControl as ButtonControlType } from '../types';

export function ButtonControl({ control }: { control: ButtonControlType }) {
  const coreVariant =
    control.variant === 'primary'
      ? 'primary'
      : control.variant === 'danger'
        ? 'destructive'
        : 'secondary';

  return (
    <Button
      variant={coreVariant}
      onClick={control.onClick}
      disabled={control.disabled}
      fullWidth
    >
      {control.icon && <control.icon className="size-4 shrink-0" />}
      {control.label}
    </Button>
  );
}
