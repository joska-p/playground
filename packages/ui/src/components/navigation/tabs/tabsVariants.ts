import { cva } from 'class-variance-authority';

export const tabsVariants = cva(
  'bg-surface rounded-lg overflow-hidden border border-border shadow-sm',
  {
    variants: {
      variant: {
        primary: '[--tab-accent:var(--color-primary)]',
        secondary: '[--tab-accent:var(--color-secondary)]',
        accent: '[--tab-accent:var(--color-accent)]',
        destructive: '[--tab-accent:var(--color-destructive)]',
        warning: '[--tab-accent:var(--color-warning)]'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export const tabTriggerVariants = cva(
  [
    'text-muted-foreground px-5 py-3 text-sm font-medium transition-colors cursor-pointer relative block select-none',
    'after:absolute after:bottom-px after:left-0 after:right-0 after:h-0.5 after:rounded-full after:scale-x-0 after:transition-transform after:duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  ].join(' ')
);
