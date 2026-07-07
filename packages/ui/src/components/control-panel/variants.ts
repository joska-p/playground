import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const controlPanelVariants = cva(
  'absolute z-40 flex flex-col overflow-hidden bg-surface/50 text-foreground min-h-0 transition-all duration-300 shadow-xs backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        warning: 'border-warning',
        destructive: 'border-destructive',
        ghost: 'border-none bg-none',
        outline: 'border-border bg-transparent'
      },
      position: {
        top: 'left-0 right-0 top-0 rounded-b-lg border-b-2',
        bottom: 'left-0 right-0 bottom-0 rounded-t-lg border-t-2',
        left: 'left-0 top-0 bottom-0 landscape:rounded-r-lg landscape:border-r-2 portrait:rounded-t-lg portrait:border-t-2',
        right:
          'right-0 top-0 bottom-0 landscape:rounded-l-lg landscape:border-l-2 portrait:rounded-t-lg portrait:border-t-2'
      },
      size: {
        sm: '',
        md: '',
        lg: ''
      }
    },
    compoundVariants: [
      // === Portrait: force horizontal behavior ===
      {
        position: ['left', 'right'],
        class: 'portrait:left-0 portrait:right-0 portrait:top-auto portrait:bottom-0'
      },

      // Portrait heights
      { size: 'sm', class: 'portrait:max-h-[28vh]' },
      { size: 'md', class: 'portrait:max-h-[42vh]' },
      { size: 'lg', class: 'portrait:max-h-[55vh]' },

      // Landscape sizes
      { position: ['top', 'bottom'], size: 'sm', class: 'landscape:max-h-[28vh]' },
      { position: ['top', 'bottom'], size: 'md', class: 'landscape:max-h-[42vh]' },
      { position: ['top', 'bottom'], size: 'lg', class: 'landscape:max-h-[55vh]' },

      { position: ['left', 'right'], size: 'sm', class: 'landscape:w-[40ch]' },
      { position: ['left', 'right'], size: 'md', class: 'landscape:w-[50ch]' },
      { position: ['left', 'right'], size: 'lg', class: 'landscape:w-[60ch]' },

      // === Vertical (left/right) spacing in landscape ===
      {
        position: ['left', 'right'],
        class: 'landscape:top-4 landscape:bottom-4 landscape:h-auto'
      },

      // === Collapsed States ===
      // Horizontal (top/bottom) collapsed
      {
        position: ['top', 'bottom'],
        class: `
          data-[collapsed=true]:h-fit
          data-[collapsed=true]:overflow-hidden
          data-[collapsed=true]:bg-surface/98 data-[collapsed=true]:shadow-sm
          `
      },

      // Vertical collapsed - keep full header button (no width shrink)
      {
        position: ['left', 'right'],
        class: `
          landscape:data-[collapsed=true]:h-fit
          landscape:data-[collapsed=true]:w-[inherit]
          landscape:data-[collapsed=true]:overflow-hidden
        `
      }
    ]
  }
);

export type ControlPanelVariants = VariantProps<typeof controlPanelVariants>;
