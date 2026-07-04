import { cva } from 'class-variance-authority';

export const inputWrapperVariants = cva(
  'input-wrapper bg-surface flex items-center gap-2 rounded-md px-3',
  {
    variants: {
      expandable: {
        true: 'search-expandable',
        false: 'w-full'
      }
    },
    defaultVariants: { expandable: false }
  }
);
