import { useRef } from 'react';

function SketchPad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div>
      <h2>Sketchpad</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-card"
      />
    </div>
  );
}

export { SketchPad };
