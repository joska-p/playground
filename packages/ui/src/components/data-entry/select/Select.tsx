import type { ReactNode, Ref, SelectHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../../icons';
import { Spinner } from '../../widgets/spinner/Spinner';
import { selectVariants, selectWrapperVariants, type SelectWrapperVariants } from './variants';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, SelectWrapperVariants {
  leadingIcon?: ReactNode;
  placeholder?: string;
  wrapperClassName?: string;
  loading?: boolean;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({
  className,
  wrapperClassName,
  size,
  variant,
  leadingIcon,
  placeholder,
  loading = false,
  disabled = false,
  style,
  children,
  ref,
  ...props
}: SelectProps) {
  return (
    <div
      className={cn(selectWrapperVariants({ variant, size }), wrapperClassName)}
      style={style}
      aria-busy={loading}
    >
      {loading && <Spinner />}
      {leadingIcon && (
        <span className="text-foreground-dim shrink-0 text-xs transition-colors">
          {leadingIcon}
        </span>
      )}
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(selectVariants({ size }), className)}
          disabled={disabled || loading}
          {...props}
        >
          {placeholder && (
            <option
              value=""
              disabled
              hidden
            >
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <Icon
          name="chevron-down"
          className="text-foreground-dim pointer-events-none absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
