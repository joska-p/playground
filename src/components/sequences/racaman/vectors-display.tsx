import type { CSSProperties } from "react";
import { useRef } from "react";
import { draw } from "./lib/draw-svg";
import { useRacamanContext } from "./racaman-context";

function VectorsDisplay() {
  const { sequence, containerSize } = useRacamanContext();
  const svgRef = useRef<SVGSVGElement>(null);
  const styleObject = {
    "--dasharray": 0,
    "--dashoffset": 0,
    strokeDasharray: "var(--dasharray)",
    strokeDashoffset: "var(--dashoffset)",
    strokeWidth: 1,
    stroke: "currentColor",
  } as CSSProperties;

  if (svgRef.current) {
    draw(svgRef.current, sequence.value, containerSize.value);
  }

  return (
    <svg ref={svgRef} style={styleObject} className="max-h-full max-w-full fill-transparent" />
  );
}

export { VectorsDisplay };
