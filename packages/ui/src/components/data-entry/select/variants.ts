import { cva, type VariantProps } from 'class-variance-authority';

export const selectWrapperVariants = cva(
  'bg-surface flex w-full items-center gap-2 rounded-md px-3 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-within:ring-2 backdrop-blur',
  {
    variants: {
      variant: {
        default:
          'border-border bg-surface text-foreground focus-within:border-foreground-dim focus-within:ring-foreground-dim/28 focus-within:text-foreground-dim focus-visible:outline-foreground-dim',
        primary:
          'border-border bg-primary/10 text-primary focus-within:border-primary focus-within:ring-primary/28 focus-within:text-primary focus-visible:outline-primary',
        secondary:
          'border-border bg-secondary/10 text-secondary focus-within:border-secondary focus-within:ring-secondary/28 focus-within:text-secondary focus-visible:outline-secondary',
        accent:
          'border-border bg-accent/10 text-accent focus-within:border-accent focus-within:ring-accent/28 focus-within:text-accent focus-visible:outline-accent',
        warning:
          'border-border bg-warning/10 text-warning focus-within:border-warning focus-within:ring-warning/28 focus-within:text-warning focus-visible:outline-warning',
        destructive:
          'border-border bg-destructive/10 text-destructive focus-within:border-destructive focus-within:ring-destructive/28 focus-within:text-destructive focus-visible:outline-destructive'
      },
      size: {
        sm: 'py-1',
        default: 'py-0',
        lg: 'py-1.5'
      }
    },
    defaultVariants: { variant: 'primary', size: 'default' }
  }
);

export const selectVariants = cva(
  'text-foreground w-full cursor-pointer appearance-none bg-transparent py-2 pr-6 outline-none disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: { size: 'default' }
  }
);

export type SelectWrapperVariants = VariantProps<typeof selectWrapperVariants>;
export type SelectVariants = VariantProps<typeof selectVariants>;
