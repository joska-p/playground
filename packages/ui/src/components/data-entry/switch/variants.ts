import { cva, type VariantProps } from 'class-variance-authority';

export const switchVariants = cva(
  'relative block h-6 w-11 shrink-0 cursor-pointer rounded-full bg-foreground-dim transition-colors duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 after:absolute after:top-0.5 after:left-0.5 after:block after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:duration-250 peer-checked:after:translate-x-5 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'peer-checked:bg-surface-raised peer-focus-visible:outline-foreground-dim',
        primary: 'peer-checked:bg-primary peer-focus-visible:outline-primary',
        secondary: 'peer-checked:bg-secondary peer-focus-visible:outline-secondary',
        accent: 'peer-checked:bg-accent peer-focus-visible:outline-accent',
        warning: 'peer-checked:bg-warning peer-focus-visible:outline-warning',
        destructive: 'peer-checked:bg-destructive peer-focus-visible:outline-destructive'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export type SwitchVariants = VariantProps<typeof switchVariants>;
