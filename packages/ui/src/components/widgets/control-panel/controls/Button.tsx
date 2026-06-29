import { cn } from '../../../../utils/cn';
import type { ButtonControl as ButtonControlType } from '../types';

export function ButtonControl({ control }: { control: ButtonControlType }) {
  const variantStyles = {
    default: 'bg-muted text-foreground hover:bg-muted/80',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
  };

  return (
    <button
      type="button"
      onClick={control.onClick}
      disabled={control.disabled}
      className={cn(
        'flex w-full items-center justify-center gap-2',
        'rounded-lg px-3 py-2 text-sm font-medium',
        'transition-colors duration-100',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[control.variant ?? 'default']
      )}
    >
      {control.icon && <control.icon className="h-4 w-4" />}
      {control.label}
    </button>
  );
}
