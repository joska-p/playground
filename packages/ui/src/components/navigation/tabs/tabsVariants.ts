import { createVariant } from '../../../lib/variants/create-variant';

export const tabsVariants = createVariant({
  base: 'bg-surface rounded-lg overflow-hidden shadow-sm',
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      destructive: '',
      warning: ''
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export const tabTriggerVariants = createVariant({
  base: 'text-muted-foreground px-5 py-3 text-sm font-medium transition-colors cursor-pointer relative after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:rounded-full after:scale-x-0 after:transition-transform after:duration-200',
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
