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
      className="peer sr-only"
      style={style}
      {...props}
    />
  );

  const track = (
    <span
      className={cn(
        'bg-foreground-dim peer-checked:bg-primary relative block h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200',
        'after:absolute after:top-0.5 after:left-0.5 after:block after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:duration-250',
        'peer-checked:after:translate-x-5',
        disabled && 'pointer-events-none opacity-40',
        switchVariants({ variant }),
        className
      )}
    />
  );

  if (!label)
    return (
      <span className="inline-flex">
        {input}
        {track}
      </span>
    );

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2.5 text-[13px] select-none"
    >
      {input}
      {track}
      {label}
    </label>
  );
}
