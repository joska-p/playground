import { createVariant } from '../../lib/variants/create-variant';

export const buttonVariants = createVariant({
  base: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:brightness-110 active:scale-[.97]',
      primary: 'bg-primary text-primary-foreground hover:brightness-110 active:scale-[.97]',
      secondary: 'bg-secondary text-secondary-foreground hover:brightness-110 active:scale-[.97]',
      accent: 'bg-accent text-accent-foreground hover:brightness-110 active:scale-[.97]',
      destructive:
        'bg-destructive text-destructive-foreground hover:brightness-110 active:scale-[.97]',
      warning: 'bg-warning text-warning-foreground hover:brightness-110 active:scale-[.97]'
    },
    size: {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-sm'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});
