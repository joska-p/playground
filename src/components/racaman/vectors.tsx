import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { drawSvg } from "./lib/draw";

type Props = {
  sequence: number[];
  containerSize: { width: number; height: number };
};

const Vectors = ({ sequence, containerSize }: Props) => {
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
    const debounce = setTimeout(() => {
      if (svgRef.current) drawSvg(svgRef.current, sequence, containerSize);
    }, 10);
    return () => {
      clearTimeout(debounce);
    };
  }, [sequence, containerSize]);

  return (
    <svg ref={svgRef} style={styleObject} className="max-h-full max-w-full fill-transparent" />
  );
};

export { Vectors };
