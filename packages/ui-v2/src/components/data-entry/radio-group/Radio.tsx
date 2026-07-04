import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVar, type ColorVariant } from '../../../lib/colorVariant';

export type RadioProps = {
  variant?: ColorVariant;
  label?: ReactNode;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Radio({
  className,
  variant = 'primary',
  label,
  style,
  disabled,
  id,
  ref,
  ...props
}: RadioProps) {
  const input = (
    <input
      ref={ref}
      type="radio"
      id={id}
      disabled={disabled}
      className={cn('h-4 w-4 flex-shrink-0 cursor-pointer rounded-full', className)}
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
