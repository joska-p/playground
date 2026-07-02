import { createVariant } from '../../lib/variants/create-variant';

export const switchVariants = createVariant({
  base: 'appearance-none relative inline-flex shrink-0 cursor-pointer rounded-full bg-foreground-dim transition-colors duration-250 before:content-[""] before:absolute before:top-0.5 before:left-0.5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-250 before:[transition-timing-function:cubic-bezier(0.4,0,0.2,1)] checked:bg-(--_switch)',
  variants: {
    variant: {
      primary: '[--_switch:var(--primary)]',
      secondary: '[--_switch:var(--secondary)]',
      accent: '[--_switch:var(--accent)]',
      destructive: '[--_switch:var(--destructive)]'
    },
    size: {
      sm: 'h-5 w-9 before:size-4 checked:before:translate-x-4',
      md: 'h-6 w-[44px] before:size-5 checked:before:translate-x-5',
      lg: 'h-7 w-[52px] before:size-6 checked:before:translate-x-6'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});


