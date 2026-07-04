import { cva } from 'class-variance-authority';

export const defaultFallbackVariants = cva(
  'bg-surface rounded-lg border-l-4 p-5 flex flex-col items-start gap-3',
  {
    variants: {
      variant: {
        default: 'border-foreground-dim',
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        warning: 'border-warning',
        destructive: 'border-destructive'
      }
    },
    defaultVariants: { variant: 'destructive' }
  }
);

export const fallbackIconColor: Record<string, string> = {
  default: 'text-foreground-dim',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  warning: 'text-warning',
  destructive: 'text-destructive'
};
