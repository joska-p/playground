import { useEffect, useRef, type ReactNode } from 'react';

export type CanvasContainerProps = {
  children: ReactNode;
  className?: string;
  onResize?: (width: number, height: number) => void;
};

export function CanvasContainer({ children, className, onResize }: CanvasContainerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !onResize) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        onResize(width, height);
      }
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
    };
  }, [onResize]);

  return (
    <div
      ref={canvasRef}
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
