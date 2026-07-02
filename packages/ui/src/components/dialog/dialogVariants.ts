import { createVariant } from '../../lib/variants/create-variant';

export const dialogVariants = createVariant({
  base: 'bg-surface text-foreground w-full max-w-md rounded-lg p-0 shadow-lg self-center justify-self-center open:flex open:flex-col starting:opacity-0 starting:scale-95 starting:translate-y-2.5 animate-[dialogIn_0.3s_cubic-bezier(0.4,0,0.2,1)] backdrop:bg-black/60 backdrop:backdrop-blur-sm backdrop:starting:opacity-0 backdrop:animate-[fadeIn_0.25s_ease]',
  variants: {
    variant: {
      default: '',
      primary: 'ring-1 ring-primary/30',
      secondary: 'ring-1 ring-secondary/30',
      accent: 'ring-1 ring-accent/30',
      destructive: 'ring-1 ring-destructive/30',
      warning: 'ring-1 ring-warning/30'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
