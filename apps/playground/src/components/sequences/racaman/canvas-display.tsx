import { useEffect, useRef } from "react";
import { draw } from "./lib/draw-canvas";
import { useRacamanContext } from "./racaman-context";

function CanvasDisplay() {
  const { sequence, containerSize } = useRacamanContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, sequence, containerSize);
    }
  }, [sequence, containerSize]);

  return <canvas ref={canvasRef} />;
}

export { CanvasDisplay };
