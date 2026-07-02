import { createVariant } from '../../lib/variants/create-variant';

export const toastVariants = createVariant({
  base: 'bg-surface text-foreground flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg min-w-72 starting:opacity-0 starting:translate-x-10 starting:scale-95 animate-[toastIn_0.4s_cubic-bezier(0.4,0,0.2,1)_both]',
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      destructive: '',
      warning: ''
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
