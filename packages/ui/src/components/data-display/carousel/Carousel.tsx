import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { carouselVariants } from './variants';

export type CarouselProps = {
  children: ReactNode;
  className?: string;
  scrollAmount?: number;
  hideArrows?: boolean;
  variant?: ColorVariant;
};

export function Carousel({
  children,
  className,
  scrollAmount = 280,
  hideArrows,
  variant = 'default'
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      {!hideArrows && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => {
              scroll(-1);
            }}
            className={cn(
              'bg-surface/90 hover:bg-surface absolute top-1/2 left-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xs backdrop-blur-sm transition-colors',
              carouselVariants({ variant })
            )}
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => {
              scroll(1);
            }}
            className={cn(
              'bg-surface/90 hover:bg-surface absolute top-1/2 right-1 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xs backdrop-blur-sm transition-colors',
              carouselVariants({ variant })
            )}
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <div
        ref={trackRef}
        className="carousel flex gap-4 px-1 py-2"
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselSlide({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'carousel-slide bg-surface w-60 shrink-0 overflow-hidden rounded-lg',
        className
      )}
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {children}
    </div>
  );
}
