import { cva, type VariantProps } from 'class-variance-authority';

export const changelogItemVariants = cva(
  'flex items-baseline gap-4 font-mono transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-foreground-dim/30',
        primary: 'border-primary/40',
        secondary: 'border-secondary/40',
        accent: 'border-accent/40',
        warning: 'border-warning/40',
        destructive: 'border-destructive/40'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type ChangelogItemVariants = VariantProps<typeof changelogItemVariants>;
