import type { VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import type { ReactNode, Ref, SelectHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import { colorVar, type ColorVariant } from '../../../lib/colorVariant';
import { selectVariants, selectWrapperVariants } from './Select.variants';

export type SelectProps = {
  /** Focus-ring color token. Defaults to "primary" — same pattern as Input. */
  variant?: ColorVariant;
  /** Icon or element rendered before the select (e.g. a category glyph). */
  leadingIcon?: ReactNode;
  /** Convenience: renders a disabled, hidden first option. Omit and add
   *  your own `<option>` if you need more control. */
  placeholder?: string;
  wrapperClassName?: string;
  ref?: Ref<HTMLSelectElement>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> &
  VariantProps<typeof selectVariants>;

/**
 * Select — a native <select>, styled to match Input/Textarea. Mobile-first
 * and progressive-enhancement by construction: the browser supplies the
 * platform picker UI (a native wheel/sheet on touch devices, a native
 * dropdown on desktop), full keyboard support, and type-ahead search, none
 * of which this component has to reimplement. Stateless — pass `value`/
 * `defaultValue`/`onChange` exactly as you would on a plain `<select>`.
 */
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
      className={cn(selectWrapperVariants({ size }), wrapperClassName)}
      style={{ ['--_ring' as string]: colorVar(variant), ...style }}
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
