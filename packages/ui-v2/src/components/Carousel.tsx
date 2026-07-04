import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface CarouselProps {
  children: ReactNode;
  className?: string;
  /** Pixels scrolled per arrow click. */
  scrollAmount?: number;
  /** Hide the prev/next arrow buttons (touch users can still swipe). */
  hideArrows?: boolean;
}

/**
 * Carousel — overflow-x:scroll + scroll-snap does all the heavy lifting in
 * CSS (see `.carousel`/`.carousel-slide` in globals.css). React only wires
 * up the optional prev/next buttons via `scrollBy`, exactly as noted in the
 * source design's own conversion guide.
 */
export function Carousel({ children, className, scrollAmount = 280, hideArrows }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      {!hideArrows && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 bg-surface/90 hover:bg-surface flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition-colors backdrop-blur-sm"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 bg-surface/90 hover:bg-surface flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition-colors backdrop-blur-sm"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <div ref={trackRef} className="carousel flex gap-4 py-2 px-1">
        {children}
      </div>
    </div>
  );
}

export function CarouselSlide({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "carousel-slide w-[240px] flex-shrink-0 overflow-hidden rounded-lg bg-surface",
        className
      )}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {children}
    </div>
  );
}
