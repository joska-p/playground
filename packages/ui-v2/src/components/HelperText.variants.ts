import { cva } from 'class-variance-authority';

/**
 * No `size` axis here on purpose: helper/hint text under a form field is
 * always the smallest text in the hierarchy — a "large helper text" isn't
 * a real design need, so exposing a size prop would just be an unused
 * knob. Color is the only variant that carries meaning (default hint vs.
 * a warning/destructive validation message).
 */
export const helperTextVariants = cva('flex items-start gap-1.5 text-xs leading-relaxed', {
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
  defaultVariants: { variant: 'default' }
});
