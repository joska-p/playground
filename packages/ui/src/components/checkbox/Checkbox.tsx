import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../utils/cn';
import { createVariant } from '../../lib/variants/create-variant';

const checkboxVariants = createVariant({
  base: 'appearance-none h-4 w-4 shrink-0 cursor-pointer rounded border border-border bg-surface transition-colors duration-200 checked:bg-[color:var(--_accent)] checked:border-[color:var(--_accent)] disabled:cursor-not-allowed disabled:opacity-40',
  variants: {
    variant: {
      primary: '[--_accent:var(--primary)]',
      secondary: '[--_accent:var(--secondary)]',
      accent: '[--_accent:var(--accent)]',
      destructive: '[--_accent:var(--destructive)]',
      outline: '[--_accent:var(--primary)]',
      ghost: '[--_accent:var(--foreground)]'
    },
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

type CheckboxProps = {} & ComponentProps<'input'> & VariantProps<typeof checkboxVariants>;

function Checkbox({ ref, className, variant, size, ...props }: CheckboxProps) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(checkboxVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Checkbox };
