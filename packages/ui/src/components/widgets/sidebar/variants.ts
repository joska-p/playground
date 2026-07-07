import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const sidebarVariants = cva({
  variant: {
    default: 'border-border bg-surface',
    primary: 'border-primary bg-primary',
    secondary: 'border-secondary bg-secondary',
    accent: 'border-accent bg-accent',
    warning: 'border-warning bg-warning',
    destructive: 'border-destructive bg-destructive',
    ghost: 'border-transparent bg-transparent'
  },
  position: {
    top: 'left-0 right-0 top-0 rounded-b-lg border-b-2 grid-rows-[0_1fr] data-[state=open]:grid-rows-[var(--sidebar-size)_1fr] grid-cols-1',
    bottom:
      'left-0 right-0 bottom-0 rounded-t-lg border-t-2 grid-rows-[1fr_0] data-[state=open]:grid-rows-[1fr_var(--sidebar-size)] grid-cols-1',
    left: 'left-0 top-0 bottom-0 landscape:rounded-r-lg grid-cols-[0_1fr] data-[state=open]:grid-cols-[var(--sidebar-size)_1fr] grid-rows-1',
    right:
      'right-0 top-0 bottom-0 landscape:rounded-l-lg grid-cols-[1fr_0] data-[state=open]:grid-cols-[1fr_var(--sidebar-size)] grid-rows-1'
  },
  size: {
    sm: '14rem', // 224px
    md: '18rem', // 288px
    lg: '24rem' // 384px
  }
});

export type SidebarVariant = VariantProps<typeof sidebarVariants>;
