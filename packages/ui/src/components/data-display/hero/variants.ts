import { cva, type VariantProps } from 'class-variance-authority';

export const heroVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface-raised/5 text-foreground-dim from-foreground-dim backdrop-blur-xs',
      primary: 'bg-primary/5 text-primary from-primary backdrop-blur-xs',
      secondary: 'bg-secondary/5 text-secondary from-secondary backdrop-blur-xs',
      accent: 'bg-accent/5 text-accent from-accent backdrop-blur-xs',
      warning: 'bg-warning/5 text-warning from-warning backdrop-blur-xs',
      destructive: 'bg-destructive/5 text-destructive from-destructive backdrop-blur-xs',
      ghost: 'text-foreground'
    }
  },
  defaultVariants: { variant: 'primary' }
});

export type HeroVariants = VariantProps<typeof heroVariants>;
