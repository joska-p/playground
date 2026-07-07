import { cva } from 'class-variance-authority';

/**
 * Button variants — kept in its own file so the variant config can be
 * imported independently of the component (e.g. for style previews,
 * Storybook controls, or reused by another primitive).
 */
export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium ' +
    'transition-all duration-200 active:scale-[.97] disabled:pointer-events-none disabled:opacity-40 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-surface-raised text-foreground hover:brightness-110 focus-visible:outline-foreground-dim',
        primary:
          'bg-primary text-primary-foreground hover:brightness-110 focus-visible:outline-primary',
        secondary:
          'bg-secondary text-secondary-foreground hover:brightness-110 focus-visible:outline-secondary',
        accent:
          'bg-accent text-accent-foreground hover:brightness-110 focus-visible:outline-accent',
        warning:
          'bg-warning text-warning-foreground hover:brightness-110 focus-visible:outline-warning',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-110 focus-visible:outline-destructive',
        ghost: 'text-foreground hover:bg-surface-raised focus-visible:outline-foreground-dim',
        outline:
          'text-foreground-dim border border-border bg-transparent hover:text-foreground focus-visible:outline-foreground-dim',
        link: 'text-primary hover:bg-primary/10 focus-visible:outline-primary'
      },
      size: {
        sm: 'px-3 py-1.5 text-[12px]',
        default: 'px-4 py-2 text-[13px]',
        lg: 'px-6 py-3 text-[14px]',
        icon: 'p-2.5 text-[13px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
