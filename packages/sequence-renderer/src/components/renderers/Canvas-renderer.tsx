import { useEffect, useRef } from "react";
import { draw } from "../lib/draw-canvas.js";
import { useSequenceContext } from "../Sequence-context.js";

function CanvasRenderer() {
  const { sequence, containerSize } = useSequenceContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, sequence, containerSize);
    }
  }, [sequence, containerSize]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export { CanvasRenderer };
