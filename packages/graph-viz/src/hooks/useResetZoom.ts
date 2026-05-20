import { useCallback } from "react";
import * as d3 from "d3";

/**
 * Returns a stable `resetZoom` callback that re-centres the simulation
 * viewport.  Requires refs that are owned by `useGraphSimulation`.
 */
export function useResetZoom(
  svgRef: React.RefObject<SVGSVGElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  zoomRef: React.RefObject<d3.ZoomBehavior<SVGSVGElement, unknown> | null>
) {
  return useCallback(() => {
    if (!svgRef.current || !zoomRef.current || !containerRef.current) return;
    const W = containerRef.current.clientWidth;
    const H = containerRef.current.clientHeight;
    d3.select(svgRef.current)
      .transition()
      .duration(500)
      .call((sel) =>
        zoomRef.current!.transform(
          sel,
          d3.zoomIdentity
            .translate(W / 2, H / 2)
            .scale(0.5)
            .translate(-W / 2, -H / 2)
        )
      );
  }, [svgRef, containerRef, zoomRef]);
}
