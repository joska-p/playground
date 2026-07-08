import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { checkboxVariants } from './variants';

export type CheckboxProps = {
  variant?: ColorVariant;
  label?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Checkbox({
  className,
  variant = 'primary',
  label,
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
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center gap-2.5 text-sm select-none',
        disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer'
      )}
    >
      {input}
      {label}
    </label>
  );
}
