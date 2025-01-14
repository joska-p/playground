import { useEffect, useRef } from "react";
import { CanvasDisplay } from "./canvas-display";
import { useRacamanContext } from "./racaman-context";
import { VectorsDisplay } from "./vectors-display";

function RacamanDisplay() {
  const { drawMode, containerSize } = useRacamanContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;
      containerSize.value = {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [containerRef, containerSize]);

  return (
    <div ref={containerRef} className="absolute inset-0 content-center overflow-hidden">
      {drawMode.value === "vector-mode" && <VectorsDisplay />}
      {drawMode.value === "canvas-mode" && <CanvasDisplay />}
    </div>
  );
}
export { RacamanDisplay };
