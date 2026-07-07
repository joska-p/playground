import { cva } from 'class-variance-authority';

export const controlPanelVariants = cva(
  'absolute z-40 flex flex-col overflow-hidden bg-surface/95 backdrop-blur-sm text-foreground min-h-0 transition-all duration-300 shadow-xs',
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        warning: 'border-warning',
        destructive: 'border-destructive'
      },
      position: {
        top: 'left-0 right-0 top-0 rounded-b-lg border-b-2',
        bottom: 'left-0 right-0 bottom-0 rounded-t-lg border-t-2',
        left: 'left-0 top-0 bottom-0 rounded-r-lg border-r-2',
        right: 'right-0 top-0 bottom-0 rounded-l-lg border-l-2'
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
        class:
          'portrait:left-0 portrait:right-0 portrait:top-auto portrait:bottom-0 portrait:rounded-t-lg'
      },

      // Portrait heights
      { size: 'sm', class: 'portrait:max-h-[28vh]' },
      { size: 'md', class: 'portrait:max-h-[42vh]' },
      { size: 'lg', class: 'portrait:max-h-[55vh]' },

      // Landscape sizes
      { position: ['top', 'bottom'], size: 'sm', class: 'landscape:max-h-[24vh]' },
      { position: ['top', 'bottom'], size: 'md', class: 'landscape:max-h-[34vh]' },
      { position: ['top', 'bottom'], size: 'lg', class: 'landscape:max-h-[45vh]' },

      { position: ['left', 'right'], size: 'sm', class: 'landscape:w-64' },
      { position: ['left', 'right'], size: 'md', class: 'landscape:w-72' },
      { position: ['left', 'right'], size: 'lg', class: 'landscape:w-80' },

      // === Vertical (left/right) spacing in landscape ===
      {
        position: ['left', 'right'],
        class: 'landscape:top-4 landscape:bottom-4 landscape:h-auto'
      },

      // === Collapsed States ===
      // Horizontal (top/bottom) collapsed
      {
        position: ['top', 'bottom'],
        class: 'data-[collapsed=true]:h-11 data-[collapsed=true]:overflow-hidden'
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
