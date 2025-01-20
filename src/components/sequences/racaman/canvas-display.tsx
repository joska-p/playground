import { useEffect, useRef } from "react";
import { draw } from "./lib/draw-canvas";
import { useRacamanContext } from "./racaman-context";

function CanvasDisplay() {
  const { sequence, containerSize } = useRacamanContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, sequence.value, containerSize.value);
    }
  }, [sequence.value, containerSize.value]);

  return <canvas ref={canvasRef} />;
}

export { CanvasDisplay };
