import { createVariant } from '../../../lib/variants/create-variant';

export const switchVariants = createVariant({
  base: 'appearance-none relative inline-flex shrink-0 cursor-pointer rounded-full bg-foreground-dim transition-colors duration-250 before:content-[""] before:absolute before:top-0.5 before:left-0.5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-250 before:[transition-timing-function:cubic-bezier(0.4,0,0.2,1)] checked:bg-(--_switch)',
  variants: {
    variant: {
      primary: 'checked:bg-primary',
      secondary: 'checked:bg-secondary',
      accent: 'checked:bg-accent',
      destructive: 'checked:bg-destructive',
      warning: 'checked:bg-warning',
      outline: 'checked:bg-transparent ring ring-muted'
    },
    size: {
      sm: 'h-5 w-9 before:size-4 checked:before:translate-x-4',
      md: 'h-6 w-11 before:size-5 checked:before:translate-x-5',
      lg: 'h-7 w-14 before:size-6 checked:before:translate-x-6'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});
