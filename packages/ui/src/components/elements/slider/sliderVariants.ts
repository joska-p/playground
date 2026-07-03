import { cva } from 'class-variance-authority';

export const sliderVariants = cva(
  [
    'w-full cursor-pointer appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 touch-none',

    // WebKit Thumb Styling (Chrome, Safari, Edge)
    '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95',

    // Firefox Thumb Styling
    '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-110 active:[&::-moz-range-thumb]:scale-95',

    // WebKit Track Styling
    '[&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:rounded-full',

    // Firefox Track Styling
    '[&::-moz-range-track]:w-full [&::-moz-range-track]:rounded-full'
  ],
  {
    variants: {
      variant: {
        primary:
          '[&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-runnable-track]:bg-secondary [&::-moz-range-track]:bg-secondary',
        secondary:
          '[&::-webkit-slider-thumb]:bg-secondary [&::-moz-range-thumb]:bg-secondary [&::-webkit-slider-runnable-track]:bg-secondary/30 [&::-moz-range-track]:bg-secondary/30',
        accent:
          '[&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:bg-accent [&::-webkit-slider-runnable-track]:bg-accent/30 [&::-moz-range-track]:bg-accent/30',
        generative:
          '[&::-webkit-slider-thumb]:bg-category-generative [&::-moz-range-thumb]:bg-category-generative [&::-webkit-slider-runnable-track]:bg-category-generative/30 [&::-moz-range-track]:bg-category-generative/30',
        image:
          '[&::-webkit-slider-thumb]:bg-category-image [&::-moz-range-thumb]:bg-category-image [&::-webkit-slider-runnable-track]:bg-category-image/30 [&::-moz-range-track]:bg-category-image/30',
        random:
          '[&::-webkit-slider-thumb]:bg-category-random [&::-moz-range-thumb]:bg-category-random [&::-webkit-slider-runnable-track]:bg-category-random/30 [&::-moz-range-track]:bg-category-random/30'
      },
      size: {
        sm:
          // 20px thumb, 4px track
          '[&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-5 [&::-moz-range-thumb]:size-5 [&::-webkit-slider-runnable-track]:h-1 [&::-moz-range-track]:h-1',
        md:
          // 24px thumb (optimal for standard touch), 8px track
          '[&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-6 [&::-moz-range-thumb]:size-6 [&::-webkit-slider-runnable-track]:h-2 [&::-moz-range-track]:h-2',
        lg:
          // 32px thumb (very easy mobile grabbing), 12px track
          '[&::-webkit-slider-thumb] [&::-webkit-slider-thumb]:size-8 [&::-moz-range-thumb]:size-8 [&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-track]:h-3'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
