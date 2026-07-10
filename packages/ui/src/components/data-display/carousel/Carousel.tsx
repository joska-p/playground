import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cn } from '../../../lib/cn';
import { Spinner } from '../../widgets/spinner/Spinner';
import { carouselArrowVariants, type CarouselArrowVariants } from './variants';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement>, CarouselArrowVariants {
  children: ReactNode;
  scrollAmount?: number;
  hideArrows?: boolean;
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function Carousel({
  children,
  className,
  scrollAmount = 280,
  hideArrows = false,
  loading = false,
  variant,

  ref,
  ...props
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      aria-busy={loading}
      aria-label={loading ? 'Loading carousel content' : undefined}
      {...props}
    >
      {!hideArrows && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => {
              scroll(-1);
            }}
            className={cn(carouselArrowVariants({ variant }))}
            style={{ left: '0.25rem', boxShadow: 'var(--shadow-md)' }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => {
              scroll(1);
            }}
            className={cn(carouselArrowVariants({ variant }))}
            style={{ right: '0.25rem', boxShadow: 'var(--shadow-md)' }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <div
        ref={trackRef}
        className="carousel flex gap-4 px-1 py-2"
        aria-hidden={loading}
      >
        {loading && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function CarouselSlide({ children, className, ref, ...props }: CarouselSlideProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'carousel-slide bg-surface w-60 shrink-0 overflow-hidden rounded-lg',
        className
      )}
      style={{ boxShadow: 'var(--shadow-sm)' }}
      {...props}
    >
      {children}
    </div>
  );
}
