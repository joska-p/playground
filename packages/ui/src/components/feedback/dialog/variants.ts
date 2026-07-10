import { cva, type VariantProps } from 'class-variance-authority';

export const dialogVariants = cva(
  'dialog-modal bg-surface w-full self-center justify-self-center rounded-lg p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-dim',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-[90vw]'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export const dialogBodyVariants = cva('p-5');
export const dialogTitleVariants = cva('text-foreground mb-2 text-[15px] font-medium');
export const dialogDescriptionVariants = cva('text-foreground-muted text-[13px] leading-relaxed');
export const dialogFooterVariants = cva(
  'bg-surface-raised/50 flex justify-end gap-2 rounded-b-lg px-5 py-3'
);

export type DialogVariants = VariantProps<typeof dialogVariants>;
