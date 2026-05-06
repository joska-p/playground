import { useEffect, useRef } from "react";
import { sinusoid } from "@repo/generators";
import { createCircularBuffer } from "../../utils/circularBuffer.js";
import { drawGrid, drawWaveform } from "../../utils/oscillographRenderer.js";

function Oscillograph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Lazy generator: only maintains a single `t` counter, no memory accumulation.
    // Outputs values in [-amplitude, amplitude] range (amplitude=1 → -1 to 1, amplitude=50 here → -50 to 50).
    const generator = sinusoid({ amplitude: 50, frequency: 1 });
    // Circular buffer: fixed-size with O(1) writes, avoids costly shift().
    const circularBuffer = createCircularBuffer({ size: 200 });
    const maxDataPoints = 200;
    const centerY = canvas.height / 2;

    function animate() {
      const value = generator.next().value;
      if (value === undefined) return;

      circularBuffer.push(value);

      const currentCanvas = canvas!;
      const currentCtx = ctx!;

      currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

      drawGrid({ ctx: currentCtx, width: currentCanvas.width, height: currentCanvas.height });
      drawWaveform({
        ctx: currentCtx,
        entries: circularBuffer.entries(),
        centerY,
        maxDataPoints,
        width: currentCanvas.width,
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div>
      <h2>Oscillograph </h2>
      <canvas ref={canvasRef} width={600} height={300} className="h-full w-full rounded bg-black" />
    </div>
  );
}

export { Oscillograph };
