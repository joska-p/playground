import { cva } from 'class-variance-authority';
import { COLOR_CLASSES } from '../../../lib/colorVariant';

export const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: COLOR_CLASSES,
      appearance: {
        soft: '',
        solid: 'text-background',
        outline: 'bg-transparent border'
      },
      dot: {
        true: 'before:mr-1 before:size-1.5 before:rounded-full before:shrink-0 before:bg-current',
        false: ''
      }
    },
    compoundVariants: [
      { appearance: 'solid', variant: 'default', class: 'bg-surface-raised text-background' },
      { appearance: 'solid', variant: 'primary', class: 'bg-primary text-background' },
      { appearance: 'solid', variant: 'secondary', class: 'bg-secondary text-background' },
      { appearance: 'solid', variant: 'accent', class: 'bg-accent text-background' },
      { appearance: 'solid', variant: 'warning', class: 'bg-warning text-background' },
      { appearance: 'solid', variant: 'destructive', class: 'bg-destructive text-background' },
      { appearance: 'solid', variant: 'ghost', class: 'text-background' },
      {
        appearance: 'solid',
        variant: 'outline',
        class: 'bg-transparent border border-border text-background'
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
      },
      { appearance: 'outline', variant: 'ghost', class: 'bg-transparent text-foreground' },
      {
        appearance: 'outline',
        variant: 'outline',
        class: 'bg-transparent border border-border text-foreground-dim'
      }
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'soft',
      dot: false
    }
  }
);
