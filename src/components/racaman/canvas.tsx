import { useEffect, useRef } from "react"
import { draw } from "./lib/draw"

type Props = {
  sequence: number[]
  containerSize: { width: number; height: number }
}

const Canvas = ({ sequence, containerSize }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && sequence) draw(canvasRef.current, sequence, containerSize)
  }, [canvasRef, sequence, containerSize])

  return <canvas ref={canvasRef} className="mx-auto" />
}

export default Canvas
