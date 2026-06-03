import { useEffect, useRef } from "react";
import { drawSample } from "./draw.ts";
import type { Paths } from "../../core/drawing.types.ts";

type DrawingProps = {
  paths: Paths;
};

function Drawing({ paths }: DrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      drawSample(canvas, ctx, paths);

      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    }
  }, [paths, canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

export { Drawing };
