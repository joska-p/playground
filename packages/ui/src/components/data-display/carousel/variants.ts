import { cva, type VariantProps } from 'class-variance-authority';

export const carouselArrowVariants = cva(
  'absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xs backdrop-blur-sm transition-all duration-200 active:scale-[.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-surface/90 hover:bg-surface text-foreground-dim focus-visible:outline-foreground-dim',
        primary:
          'bg-primary/90 hover:bg-primary text-primary-foreground focus-visible:outline-primary',
        secondary:
          'bg-secondary/90 hover:bg-secondary text-secondary-foreground focus-visible:outline-secondary',
        accent: 'bg-accent/90 hover:bg-accent text-accent-foreground focus-visible:outline-accent',
        warning:
          'bg-warning/90 hover:bg-warning text-warning-foreground focus-visible:outline-warning',
        destructive:
          'bg-destructive/90 hover:bg-destructive text-destructive-foreground focus-visible:outline-destructive',
        outline:
          'bg-transparent border border-border hover:bg-surface text-foreground-dim focus-visible:outline-foreground-dim'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export type CarouselArrowVariants = VariantProps<typeof carouselArrowVariants>;
