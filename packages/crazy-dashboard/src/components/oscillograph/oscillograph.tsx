import { useEffect, useRef } from "react";
import { sinusoid } from "@repo/generators";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

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
    // Data buffer capped at 200 points to prevent unbounded memory growth.
    const data: number[] = [];
    const maxDataPoints = 200;
    const centerY = canvas.height / 2;

    function animate() {
      const value = generator.next().value;
      if (value === undefined) return;

      data.push(value);
      if (data.length > maxDataPoints) data.shift();

      const currentCanvas = canvas!;
      const currentCtx = ctx!;

      currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

      currentCtx.strokeStyle = "#333";
      currentCtx.lineWidth = 0.5;
      for (let i = 0; i < currentCanvas.height; i += 20) {
        currentCtx.beginPath();
        currentCtx.moveTo(0, i);
        currentCtx.lineTo(currentCanvas.width, i);
        currentCtx.stroke();
      }
      for (let i = 0; i < currentCanvas.width; i += 20) {
        currentCtx.beginPath();
        currentCtx.moveTo(i, 0);
        currentCtx.lineTo(i, currentCanvas.height);
        currentCtx.stroke();
      }

      currentCtx.strokeStyle = "#33ff33";
      currentCtx.lineWidth = 2;
      currentCtx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const x = (i / maxDataPoints) * currentCanvas.width;
        const y = centerY - data[i]!;
        if (i === 0) currentCtx.moveTo(x, y);
        else currentCtx.lineTo(x, y);
      }
      currentCtx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillograph</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full bg-black rounded"
        />
      </CardContent>
    </Card>
  );
}

export { Oscillograph };
