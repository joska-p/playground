import { cva, type VariantProps } from 'class-variance-authority';

export const accordionItemVariants = cva(
  'ml-3 block size-2 shrink-0 -rotate-45 backdrop-blur border-r-[1.5px] border-b-[1.5px] border-current transition-transform group-open:rotate-45',
  {
    variants: {
      variant: {
        default: 'text-foreground-dim',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        warning: 'text-warning',
        destructive: 'text-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;
