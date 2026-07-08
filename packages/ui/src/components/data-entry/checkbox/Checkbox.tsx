import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { checkboxVariants } from './variants';

const ACCENT_COLOR: Record<ColorVariant, string> = {
  default: 'var(--foreground-dim)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  ghost: 'var(--foreground)',
  outline: 'var(--foreground-dim)'
};

export type CheckboxProps = {
  variant?: ColorVariant;
  label?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Checkbox({
  className,
  variant = 'primary',
  label,
  style,
  disabled,
  id,
  ref,
  ...props
}: CheckboxProps) {
  const input = (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      disabled={disabled}
      className={cn(className)}
      style={{ accentColor: ACCENT_COLOR[variant], ...style }}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label
      htmlFor={id}
      className={cn(
        checkboxVariants({ variant }),
        disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer'
      )}
    >
      {input}
      {label}
    </label>
  );
}
