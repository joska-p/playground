import { useEffect, useRef } from "react";
import { useGraphSimulation } from "../hooks/useGraphSimulation";
import { useResetZoom } from "../hooks/useResetZoom";
import { LoadingOverlay } from "./LoadingOverlay";

type GraphCanvasProps = {
  onResetZoomReady: (fn: () => void) => void;
};

export function GraphCanvas({ onResetZoomReady }: GraphCanvasProps) {
  const { svgRef, containerRef, zoomRef } = useGraphSimulation();
  const resetZoom = useResetZoom(svgRef, containerRef, zoomRef);
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    onResetZoomReady(resetZoom);
  }, [onResetZoomReady, resetZoom]);

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden">
      <LoadingOverlay />
      <svg ref={svgRef} width="100%" height="100%" className="block w-full h-full" />
    </div>
  );
}
