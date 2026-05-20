import { useEffect, useRef } from "react";
import { useGraphSimulation } from "../hooks/useGraphSimulation";
import { useResetZoom } from "../hooks/useResetZoom";
import { LoadingOverlay } from "./LoadingOverlay";

type GraphCanvasProps = {
  /** Callback so the parent (or TopBar) can trigger a zoom reset */
  onResetZoomReady: (fn: () => void) => void;
};

/**
 * Owns the SVG element and wires up the D3 simulation.
 * Keeps the canvas layer deliberately free of React-rendered children —
 * D3 manages all SVG DOM directly for performance.
 */
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
    <div ref={containerRef} style={styles["container"]}>
      <LoadingOverlay />
      <svg ref={svgRef} width="100%" height="100%" style={styles["svg"]} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  svg: {
    display: "block",
  },
};
