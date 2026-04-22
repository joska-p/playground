import { useEffect, useRef } from "react";
import { draw } from "../../core/draw-canvas.js";
import { useSequenceStore } from "../../store/useSequenceStore.js";

function CanvasRenderer() {
  const { sequence } = useSequenceStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, sequence);
    }
  }, [sequence]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export { CanvasRenderer };
