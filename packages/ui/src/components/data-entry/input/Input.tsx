import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { inputVariants, type InputVariants } from './variants';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariants {
  loading?: boolean;
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export function Input({
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  icon,
  ref,
  ...props
}: InputProps) {
  return (
    <div className={cn(inputVariants({ variant, size }), className)}>
      {icon && (
        <span className="text-foreground-dim shrink-0 text-xs transition-colors">{icon}</span>
      )}
      <input
        ref={ref}
        className="text-foreground placeholder:text-foreground-dim w-full bg-transparent py-1 outline-none"
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
