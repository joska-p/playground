import { cva } from 'class-variance-authority';

export const sliderVariants = cva(
  [
    // Base standard element styling
    'w-full cursor-pointer appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 touch-none',

    // Focused Accessible Outlines (Targeting custom focus rings on the thumb element)
    'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-ring focus-visible:[&::-webkit-slider-thumb]:ring-offset-2',
    'focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-ring focus-visible:[&::-moz-range-thumb]:ring-offset-2',

    // WebKit Thumb Base Layout (Chrome, Safari, Edge)
    '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-105 active:[&::-webkit-slider-thumb]:scale-95',

    // Firefox Thumb Base Layout
    '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-105 active:[&::-moz-range-thumb]:scale-95',

    // WebKit Track Base Layout (Ensuring initial dimensions are set)
    '[&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:transition-colors',

    // Firefox Track Base Layout
    '[&::-moz-range-track]:w-full [&::-moz-range-track]:rounded-full [&::-moz-range-track]:transition-colors'
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          '[&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-runnable-track]:bg-secondary/25 [&::-moz-range-track]:bg-secondary/25',
        secondary:
          '[&::-webkit-slider-thumb]:bg-secondary [&::-moz-range-thumb]:bg-secondary [&::-webkit-slider-runnable-track]:bg-surface-raised [&::-moz-range-track]:bg-surface-raised',
        accent:
          '[&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:bg-accent [&::-webkit-slider-runnable-track]:bg-accent/20 [&::-moz-range-track]:bg-accent/20'
      },
      size: {
        // Precise math alignment: Thumb Size, Track Height, and Negative Webkit Margin Center-Offset
        sm: [
          '[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:-mt-2',
          '[&::-moz-range-thumb]:size-5',
          '[&::-webkit-slider-runnable-track]:h-1 [&::-moz-range-track]:h-1'
        ].join(' '),
        md: [
          '[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:-mt-2', // Touch optimal size
          '[&::-moz-range-thumb]:size-6',
          '[&::-webkit-slider-runnable-track]:h-2 [&::-moz-range-track]:h-2'
        ].join(' '),
        lg: [
          '[&::-webkit-slider-thumb]:size-8 [&::-webkit-slider-thumb]:-mt-2.5', // Sandbox/creative art view friendly
          '[&::-moz-range-thumb]:size-8',
          '[&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-track]:h-3'
        ].join(' ')
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
