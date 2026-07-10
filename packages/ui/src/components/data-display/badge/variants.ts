import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors text-ellipsis overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised text-foreground',
        primary: 'bg-primary/15 text-primary',
        secondary: 'bg-secondary/15 text-secondary',
        accent: 'bg-accent/15 text-accent',
        warning: 'bg-warning/15 text-warning',
        destructive: 'bg-destructive/15 text-destructive'
      },
      appearance: {
        soft: '',
        solid: 'text-background',
        outline: 'bg-transparent border'
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base'
      },
      dot: {
        true: 'before:mr-1 before:size-1.5 before:rounded-full before:shrink-0 before:bg-current',
        false: ''
      }
    },
    compoundVariants: [
      { appearance: 'solid', variant: 'default', class: 'bg-surface-raised text-foreground' },
      { appearance: 'solid', variant: 'primary', class: 'bg-primary text-primary-foreground' },
      {
        appearance: 'solid',
        variant: 'secondary',
        class: 'bg-secondary text-secondary-foreground'
      },
      { appearance: 'solid', variant: 'accent', class: 'bg-accent text-accent-foreground' },
      { appearance: 'solid', variant: 'warning', class: 'bg-warning text-warning-foreground' },
      {
        appearance: 'solid',
        variant: 'destructive',
        class: 'bg-destructive text-destructive-foreground'
      },
      {
        appearance: 'outline',
        variant: 'default',
        class: 'bg-transparent border border-foreground-dim text-foreground-dim'
      },
      {
        appearance: 'outline',
        variant: 'primary',
        class: 'bg-transparent border border-primary text-primary'
      },
      {
        appearance: 'outline',
        variant: 'secondary',
        class: 'bg-transparent border border-secondary text-secondary'
      },
      {
        appearance: 'outline',
        variant: 'accent',
        class: 'bg-transparent border border-accent text-accent'
      },
      {
        appearance: 'outline',
        variant: 'warning',
        class: 'bg-transparent border border-warning text-warning'
      },
      {
        appearance: 'outline',
        variant: 'destructive',
        class: 'bg-transparent border border-destructive text-destructive'
      }
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'soft',
      size: 'md',
      dot: false
    }
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
