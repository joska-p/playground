import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'bg-surface flex items-center gap-2 rounded-md px-3 transition-all duration-200 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'border-border focus-within:border-foreground-dim focus-within:ring-[3px] focus-within:ring-foreground-dim/15',
        primary:
          'border-primary focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15',
        secondary:
          'border-secondary focus-within:border-secondary focus-within:ring-[3px] focus-within:ring-secondary/15',
        accent:
          'border-accent focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent/15',
        warning:
          'border-warning focus-within:border-warning focus-within:ring-[3px] focus-within:ring-warning/15',
        destructive:
          'border-destructive focus-within:border-destructive focus-within:ring-[3px] focus-within:ring-destructive/15',
        ghost:
          'border-transparent focus-within:border-transparent focus-within:ring-[3px] focus-within:ring-transparent',
        outline:
          'border-border focus-within:border-foreground-dim focus-within:ring-[3px] focus-within:ring-foreground-dim/15'
      },
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
