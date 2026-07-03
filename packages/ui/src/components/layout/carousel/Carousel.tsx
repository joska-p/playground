import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../../utils/cn';
import { carouselSlideVariants } from './carouselSlideVariants';

type CarouselProps = {
  'aria-label'?: string;
} & ComponentProps<'div'>;

function Carousel({
  ref,
  children,
  className,
  'aria-label': ariaLabel,
  ...props
}: CarouselProps) {
  return (
    <div
      ref={ref}
      role="region"
      aria-label={ariaLabel ?? 'Project Carousel'}
      className={cn(
        'flex gap-4 overflow-x-auto scroll-smooth py-3 px-1',
        'scrollbar-none [&::-webkit-scrollbar]:hidden', // Completely hides standard layout scrollbars
        'snap-x snap-mandatory touch-pan-x',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CarouselSlideProps = ComponentProps<'div'> & VariantProps<typeof carouselSlideVariants>;

function CarouselSlide({
  ref,
  children,
  className,
  variant,
  size,
  ...props
}: CarouselSlideProps) {
  return (
    <div
      ref={ref}
      className={cn(carouselSlideVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

Carousel.Slide = CarouselSlide;

export { Carousel };
export type { CarouselProps, CarouselSlideProps };