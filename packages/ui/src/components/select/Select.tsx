import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';
import { HelperText } from '../helper-text/HelperText';
import { IconChevronDown } from '../icons/components/IconChevronDown';
import { selectVariants } from './selectVariants';

type SelectProps = {
  label?: string;
  helperText?: string;
  children: ReactNode;
  fullWidth?: boolean;
} & ComponentProps<'select'> &
  VariantProps<typeof selectVariants>;

function Select({
  ref,
  className,
  variant,
  label,
  helperText,
  fullWidth,
  id,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-foreground/80 text-xs"
        >
          {label}
        </label>
      )}
      <div className={cn('relative', fullWidth && 'w-full')}>
        <select
          id={selectId}
          ref={ref}
          className={cn(selectVariants({ variant, className }), fullWidth && 'w-full')}
          {...props}
        >
          {children}
        </select>
        <div className="text-foreground/50 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <IconChevronDown className="h-4 w-4" />
        </div>
      </div>
      {helperText && <HelperText destructive={variant === 'destructive'}>{helperText}</HelperText>}
    </div>
  );
}

export { Select };
