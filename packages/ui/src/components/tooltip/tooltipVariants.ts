import { createVariant } from '../../lib/variants/create-variant';

export const tooltipVariants = createVariant({
  base: 'relative after:pointer-events-none after:absolute after:bottom-[calc(100%+8px)] after:left-1/2 after:-translate-x-1/2 after:px-2.5 after:py-1 after:rounded after:text-xs after:whitespace-nowrap after:opacity-0 after:transition-opacity after:duration-150 hover:after:opacity-100 after:content-[attr(data-tooltip)]',
  variants: {
    variant: {
      default: 'after:bg-foreground after:text-background',
      primary: 'after:bg-primary after:text-primary-foreground',
      secondary: 'after:bg-secondary after:text-secondary-foreground',
      accent: 'after:bg-accent after:text-accent-foreground',
      destructive: 'after:bg-destructive after:text-destructive-foreground',
      warning: 'after:bg-warning after:text-warning-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
