import type { VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import type { ReactNode, Ref, SelectHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { selectVariants, selectWrapperVariants } from './variants';

export type SelectProps = {
  variant?: ColorVariant;
  leadingIcon?: ReactNode;
  placeholder?: string;
  wrapperClassName?: string;
  ref?: Ref<HTMLSelectElement>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> &
  VariantProps<typeof selectVariants>;

export function Select({
  className,
  wrapperClassName,
  size,
  variant = 'primary',
  leadingIcon,
  placeholder,
  style,
  children,
  ref,
  ...props
}: SelectProps) {
  return (
    <div
      className={cn(selectWrapperVariants({ variant, size }), wrapperClassName)}
      style={style}
    >
      {leadingIcon && (
        <span className="text-foreground-dim shrink-0 text-xs transition-colors">
          {leadingIcon}
        </span>
      )}
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(selectVariants({ size }), className)}
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
        <ChevronDown className="text-foreground-dim pointer-events-none absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2" />
      </div>
    </div>
  );
}
