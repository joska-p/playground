import { cva, type VariantProps } from 'class-variance-authority';

export const controlPanelVariants = cva(
  'absolute z-40 flex flex-col overflow-hidden overflow-y-auto rounded-lg border border-border bg-surface/95 backdrop-blur-sm text-foreground min-h-0',
  {
    variants: {
      dock: {
        'bottom-sheet':
          'inset-x-0 bottom-0 max-h-fit rounded-b-none ' +
          '[&:has(details[open])]:max-h-[70vh] ' +
          'landscape:inset-x-auto landscape:left-auto landscape:right-4 landscape:top-4 ' +
          'landscape:[&:has(details[open])]:bottom-4 landscape:[&:has(details[open])]:max-h-[calc(100vh-2rem)] landscape:rounded-b-lg',
        'top-right': 'right-4 top-4 max-h-[calc(100vh-2rem)]',
        'top-left': 'left-4 top-4 max-h-[calc(100vh-2rem)]',
        inline: '!static !inset-auto max-h-none w-full'
      },
      size: {
        sm: 'w-auto open:w-full open:landscape:w-64',
        default: 'w-auto open:w-full open:landscape:w-80',
        lg: 'w-auto open:w-full open:landscape:w-96'
      }
    },
    compoundVariants: [
      { dock: 'inline', size: 'sm', class: 'landscape:w-full' },
      { dock: 'inline', size: 'default', class: 'landscape:w-full' },
      { dock: 'inline', size: 'lg', class: 'landscape:w-full' }
    ],
    defaultVariants: { dock: 'bottom-sheet', size: 'default' }
  }
);

export type ControlPanelVariantProps = VariantProps<typeof controlPanelVariants>;
