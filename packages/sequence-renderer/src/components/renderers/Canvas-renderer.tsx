import { useEffect, useRef } from "react";
import { draw } from "../lib/draw-canvas.js";
import { useSequenceContext } from "../Sequence-context.js";

function CanvasRenderer() {
  const { sequence } = useSequenceContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, sequence);
    }
  }, [sequence]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export { CanvasRenderer };
