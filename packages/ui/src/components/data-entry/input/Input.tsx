import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { colorVar, type ColorVariant } from '../../../lib/colorVariant';
import { inputWrapperVariants } from './variants';

export type InputProps = {
  /** Focus-ring color token. Defaults to "primary". */
  variant?: ColorVariant;
  /** Icon or element rendered before the input (e.g. a search glyph). */
  leadingIcon?: ReactNode;
  /** Icon/button rendered after the input (e.g. an "open" action). */
  trailingAction?: ReactNode;
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputWrapperVariants>;

/**
 * Input — mobile-first: full width by default. `expandable` opts into the
 * desktop-oriented "grows on focus" enhancement — a pure CSS :focus-within
 * transition, no JS required. Stateless: the DOM input owns its own value.
 */
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
      className={cn(inputWrapperVariants({ expandable }), wrapperClassName)}
      style={{ ['--_ring' as string]: colorVar(variant), ...style }}
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
