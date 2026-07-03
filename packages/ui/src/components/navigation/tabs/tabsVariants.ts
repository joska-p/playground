import { cva } from 'class-variance-authority';

export const tabsVariants = cva({
  base: 'bg-surface rounded-lg overflow-hidden shadow-sm',
  variants: {
    variant: {
      default: 'bg-surface',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5',
      accent: 'bg-accent/5',
      destructive: 'bg-destructive/5',
      warning: 'bg-warning/5'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export const tabTriggerVariants = cva({
  base: 'text-muted-foreground px-5 py-3 text-sm font-medium transition-colors cursor-pointer relative after:absolute after:bottom-px after:left-0 after:right-0 after:h-0.5 after:rounded-full after:scale-x-0 after:transition-transform after:duration-200',
  variants: {
    variant: {
      default: 'after:bg-primary',
      primary: 'after:bg-primary',
      secondary: 'after:bg-secondary',
      accent: 'after:bg-accent',
      destructive: 'after:bg-destructive',
      warning: 'after:bg-warning'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
