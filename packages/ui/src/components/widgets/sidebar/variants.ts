import { cva, type VariantProps } from 'class-variance-authority';

export const sidebarToggleVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground-dim bg-surface-raised/15',
      primary: 'text-primary bg-primary/15',
      secondary: 'text-secondary bg-secondary/15',
      accent: 'text-accent bg-accent/15',
      warning: 'text-warning bg-warning/15',
      destructive: 'text-destructive bg-destructive/15'
    }
  },
  defaultVariants: { variant: 'default' }
});

export type SidebarToggleVariantProps = VariantProps<typeof sidebarToggleVariants>;
