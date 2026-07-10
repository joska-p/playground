import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { Spinner } from '../../widgets/spinner/Spinner';
import { switchVariants, type SwitchVariants } from './variants';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, SwitchVariants {
  label?: ReactNode;
  loading?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function Switch({
  className,
  variant,
  label,
  loading = false,
  disabled = false,
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
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className="peer sr-only"
      {...props}
    />
  );

  const track = (
    <span className={cn(switchVariants({ variant }), className)}>
      {loading && <Spinner className="absolute inset-0 m-auto h-3.5 w-3.5 text-white" />}
    </span>
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
