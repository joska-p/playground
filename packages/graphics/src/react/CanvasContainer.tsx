import { useEffect, useRef, type ReactNode } from 'react';

export type CanvasContainerProps = {
  children: ReactNode;
  className?: string;
  onResize?: (width: number, height: number) => void;
};

export function CanvasContainer({ children, className, onResize }: CanvasContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onResize) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        onResize(width, height);
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [onResize]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
