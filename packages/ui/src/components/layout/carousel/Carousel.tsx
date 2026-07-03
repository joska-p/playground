import type { ComponentProps, ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '../../../utils/cn';
import { carouselSlideVariants } from './carouselSlideVariants';

type CarouselProps = {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
};

function Carousel({ children, className, 'aria-label': ariaLabel }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => {
          scroll('left');
        }}
        className={cn(
          'absolute top-1/2 left-1 z-10 -translate-y-1/2',
          'bg-surface/90 hover:bg-surface flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs shadow-md backdrop-blur-sm transition-colors',
          'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Scroll left"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => {
          scroll('right');
        }}
        className={cn(
          'absolute top-1/2 right-1 z-10 -translate-y-1/2',
          'bg-surface/90 hover:bg-surface flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs shadow-md backdrop-blur-sm transition-colors',
          'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Scroll right"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel ?? 'Carousel'}
        className={cn(
          'flex gap-4 overflow-x-auto scroll-smooth px-1 py-2',
          'scrollbar-none [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory'
        )}
      >
        {children}
      </div>
    </div>
  );
}

type CarouselSlideProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

function CarouselSlide({ children, className, ...props }: CarouselSlideProps) {
  return (
    <div
      className={cn(carouselSlideVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}

Carousel.Slide = CarouselSlide;

export { Carousel };
export type { CarouselProps, CarouselSlideProps };
