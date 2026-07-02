import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../../utils/cn';
import { HelperText } from '../../elements/helper-text/HelperText';
import { IconChevronDown } from '../../icons/components/IconChevronDown';
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
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-muted-foreground text-xs"
        >
          {label}
        </label>
      )}
      <div className={cn(selectVariants({ variant }), fullWidth && 'w-full')}>
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full cursor-pointer appearance-none bg-transparent py-2 outline-none',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <IconChevronDown className="text-foreground-dim pointer-events-none size-4 shrink-0" />
      </div>
      {helperText && <HelperText destructive={variant === 'destructive'}>{helperText}</HelperText>}
    </div>
  );
}

export { Select };
