import { useEffect, useRef } from "react"
import { draw } from "./lib/draw"

type Props = {
  sequence: number[]
}

const Canvas = ({ sequence }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && sequence) draw(canvasRef.current, sequence)
  }, [canvasRef, sequence])

  return (
    <div className="relative h-dvh content-center">
      <canvas ref={canvasRef} className="mx-auto" />
    </div>
  )
}

export default Canvas
