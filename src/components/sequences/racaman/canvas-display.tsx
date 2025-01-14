import { useRef } from "react";
import { draw } from "./lib/draw-canvas";
import { useRacamanContext } from "./racaman-context";

function CanvasDisplay() {
  const { sequence, containerSize } = useRacamanContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (canvasRef.current) {
    draw(canvasRef.current, sequence.value, containerSize.value);
  }

  return <canvas ref={canvasRef} />;
}

export { CanvasDisplay };
