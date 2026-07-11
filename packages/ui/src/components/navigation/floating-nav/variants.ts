import { cva, type VariantProps } from 'class-variance-authority';

export const floatingNavVariants = cva(
  'absolute top-3  z-50 flex items-center gap-1.5 px-3.5 py-1.5 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 bg-(--surface-raised)/80 backdrop-blur shadow-lg transition-[transform,box-shadow] duration-350 ease-out',
  {
    variants: {
      variant: {
        default: 'text-foreground hover:brightness-110 focus-visible:outline-foreground-dim',
        primary: 'text-primary hover:brightness-110 focus-visible:outline-primary',
        secondary: 'text-secondary hover:brightness-110 focus-visible:outline-secondary',
        accent: 'text-accent hover:brightness-110 focus-visible:outline-accent',
        warning: 'text-warning hover:brightness-110 focus-visible:outline-warning',
        destructive: 'text-destructive hover:brightness-110 focus-visible:outline-destructive'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type FloatingNavVariants = VariantProps<typeof floatingNavVariants>;
