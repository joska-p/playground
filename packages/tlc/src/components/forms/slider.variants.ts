import { cva } from 'class-variance-authority';

export const sliderVariants = cva(
    'w-full h-1.5 rounded-full bg-input appearance-none cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:focus-visible:outline-2 [&::-moz-range-thumb]:focus-visible:outline-offset-2 [&::-moz-range-thumb]:focus-visible:outline-ring',
    {
        variants: {
            color: {
                default: '',
                primary: '[&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary',
                secondary:
                    '[&::-webkit-slider-thumb]:bg-secondary [&::-moz-range-thumb]:bg-secondary',
                accent: '[&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:bg-accent',
                destructive:
                    '[&::-webkit-slider-thumb]:bg-destructive [&::-moz-range-thumb]:bg-destructive'
            }
        },
        defaultVariants: { color: 'default' }
    }
);
