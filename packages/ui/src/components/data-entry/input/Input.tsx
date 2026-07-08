import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { inputWrapperVariants } from './variants';

export type InputProps = {
  variant?: ColorVariant;
  leadingIcon?: ReactNode;
  trailingAction?: ReactNode;
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputWrapperVariants>;

export function Input({
  className,
  wrapperClassName,
  expandable,
  variant = 'primary',
  leadingIcon,
  trailingAction,
  style,
  ref,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(inputWrapperVariants({ variant, expandable }), wrapperClassName)}
      style={style}
    >
      {leadingIcon && (
        <span className="text-foreground-dim shrink-0 text-xs transition-colors">
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'text-foreground placeholder:text-foreground-dim w-full bg-transparent py-2 text-sm outline-none',
          className
        )}
        {...props}
      />
      {trailingAction && (
        <span className="text-foreground-dim hover:text-foreground shrink-0 text-xs transition-colors">
          {trailingAction}
        </span>
      )}
    </div>
  );
}
