import { useEffect, useRef } from "react";
import { draw } from "./lib/draw";

type Props = {
  sequence: number[];
  containerSize: { width: number; height: number };
};

const Canvas = ({ sequence, containerSize }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (canvasRef.current) draw(canvasRef.current, sequence, containerSize);
    }, 100);
    return () => {
      clearTimeout(debounce);
    };
  }, [canvasRef, sequence, containerSize]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
