import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { Spinner } from '../../widgets/spinner/Spinner';
import { Label } from '../label/Label';
import { radioVariants, type RadioVariants } from './variants';

const ACCENT_COLORS: Record<string, string> = {
  default: 'var(--foreground-dim)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  outline: 'var(--foreground-dim)'
};

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement>, RadioVariants {
  label?: ReactNode;
  loading?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function Radio({
  className,
  variant,
  label,
  style,
  disabled = false,
  loading = false,
  id,
  ref,
  ...props
}: RadioProps) {
  const input = (
    <input
      ref={ref}
      type="radio"
      id={id}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn('shrink-0 cursor-pointer accent-current', className)}
      style={{
        accentColor: ACCENT_COLORS[variant as string] ?? ACCENT_COLORS['default'],
        ...style
      }}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <Label
      className={cn(
        radioVariants({ variant }),
        disabled || loading ? 'pointer-events-none opacity-40' : 'cursor-pointer'
      )}
    >
      {input}
      {loading && <Spinner />}
      {label}
    </Label>
  );
}
