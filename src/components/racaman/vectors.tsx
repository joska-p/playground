import React, { useEffect, useRef } from "react"
import { drawSvg } from "./lib/draw"

type Props = {
  sequence: number[]
  containerSize: { width: number; height: number }
}

const Vectors = ({ sequence, containerSize }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const styleObject = {
    "--dasharray": 0,
    "--dashoffset": 0,
    strokeDasharray: "var(--dasharray)",
    strokeDashoffset: "var(--dashoffset)",
  } as React.CSSProperties

  useEffect(() => {
    if (svgRef.current && sequence) drawSvg(svgRef.current, sequence, containerSize)
  }, [svgRef, sequence, containerSize])

  return (
    <svg
      ref={svgRef}
      style={styleObject}
      className="mx-auto w-full fill-transparent stroke-slate-400 stroke-1"
    ></svg>
  )
}

export default Vectors