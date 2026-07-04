import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVar, type ColorVariant } from '../../../lib/colorVariant';

export type CheckboxProps = {
  variant?: ColorVariant;
  label?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * Checkbox — native input, styled with `accent-color`. Works with zero CSS
 * at all (browsers render a default checkbox); the accent color is a
 * progressive enhancement on top. Stateless: checked state lives on the
 * DOM node / is passed in as a controlled `checked` prop by the caller.
 */
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
      className={cn('h-4 w-4 shrink-0 cursor-pointer rounded', className)}
      style={{ accentColor: colorVar(variant), ...style }}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center gap-2.5 text-[13px] select-none',
        disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer'
      )}
    >
      {input}
      {label}
    </label>
  );
}
