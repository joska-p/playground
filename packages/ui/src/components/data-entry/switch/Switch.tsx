import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { switchVariants } from './variants';

export type SwitchProps = {
  variant?: ColorVariant;
  label?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Switch({
  className,
  variant = 'primary',
  label,
  style,
  disabled,
  id,
  ref,
  ...props
}: SwitchProps) {
  const input = (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      id={id}
      disabled={disabled}
      className={cn('toggle', switchVariants({ variant }), className)}
      style={style}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label
      htmlFor={id}
      className={cn(disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer')}
    >
      {input}
      {label}
    </label>
  );
}
