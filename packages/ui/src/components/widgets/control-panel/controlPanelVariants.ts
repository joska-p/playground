import { cva } from 'class-variance-authority';

export const controlPanelSidebarVariants = cva({
  base: [
    'bg-surface border-border absolute top-0 right-0 z-40 flex h-full flex-col border-l',
    'portrait:hidden landscape:flex'
  ],
  variants: {},
  defaultVariants: {}
});

export const controlPanelDrawerVariants = cva({
  base: [
    'bg-surface border-border fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col',
    'rounded-t-2xl border-t transition-transform duration-300 ease-out',
    'portrait:flex landscape:hidden'
  ],
  variants: {},
  defaultVariants: {}
});

export const controlPanelOverlayVariants = cva({
  base: [
    'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200',
    'portrait:block landscape:hidden'
  ],
  variants: {},
  defaultVariants: {}
});
