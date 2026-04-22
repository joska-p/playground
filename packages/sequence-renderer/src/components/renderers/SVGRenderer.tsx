import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { draw } from "../../core/draw-svg.js";
import { useSequenceStore } from "../../store/useSequenceStore.js";

function SVGRenderer() {
  const { sequence } = useSequenceStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const styleObject = {
    "--dasharray": 0,
    "--dashoffset": 0,
    strokeDasharray: "var(--dasharray)",
    strokeDashoffset: "var(--dashoffset)",
    strokeWidth: 1,
    stroke: "currentColor",
  } as CSSProperties;

  useEffect(() => {
    if (svgRef.current) {
      draw(svgRef.current, sequence);
    }
  }, [sequence]);

  return <svg ref={svgRef} style={styleObject} className="w-full h-full fill-transparent" />;
}

export { SVGRenderer };
