import { cva, type VariantProps } from 'class-variance-authority';

export const notificationItemVariants = cva(
  'flex items-start gap-3 px-4 py-2 font-mono transition-all duration-200 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised/15 text-foreground-dim',
        primary: 'bg-primary/15 text-primary',
        secondary: 'bg-secondary/15 text-secondary',
        accent: 'bg-accent/15 text-accent',
        warning: 'bg-warning/15 text-warning',
        destructive: 'bg-destructive/15 text-destructive'
      }
    },
    defaultVariants: { variant: 'primary' }
  }
);

export type NotificationItemVariants = VariantProps<typeof notificationItemVariants>;
