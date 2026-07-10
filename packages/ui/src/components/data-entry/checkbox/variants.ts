import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-foreground-dim ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'checked:bg-surface-raised checked:border-foreground-dim focus-visible:ring-foreground-dim',
        primary: 'checked:bg-primary checked:border-primary focus-visible:ring-primary',
        secondary: 'checked:bg-secondary checked:border-secondary focus-visible:ring-secondary',
        accent: 'checked:bg-accent checked:border-accent focus-visible:ring-accent',
        warning: 'checked:bg-warning checked:border-warning focus-visible:ring-warning',
        destructive:
          'checked:bg-destructive checked:border-destructive focus-visible:ring-destructive',
        ghost: 'checked:bg-foreground/10 checked:border-foreground focus-visible:ring-foreground',
        outline:
          'checked:bg-foreground-dim/10 checked:border-foreground-dim focus-visible:ring-foreground-dim'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
