import { cva, type VariantProps } from 'class-variance-authority';

export const menuItemVariants = cva(
  'flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-all duration-150 hover:brightness-110 active:scale-[.97] disabled:pointer-events-none disabled:opacity-40',
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
    defaultVariants: { variant: 'default' }
  }
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
