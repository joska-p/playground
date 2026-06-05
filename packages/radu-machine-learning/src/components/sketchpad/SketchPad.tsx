import { useRef, useState } from 'react';
import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';

type Point = { x: number; y: number };
type Stroke = Point[];

export function SketchPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const currentStroke = useRef<Stroke>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  const getCoordinates = (e: React.MouseEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    // Map the local mouse coordinates to the canvas's internal resolution scale
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    isDrawing.current = true;
    const pos = getCoordinates(e);
    currentStroke.current = [pos];

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const pos = getCoordinates(e);
    currentStroke.current.push(pos);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    if (currentStroke.current.length > 0) {
      setStrokes((prev) => [...prev, currentStroke.current]);
      currentStroke.current = [];
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setStrokes([]);
  };

  const handleValidate = () => {
    if (strokes.length === 0) {
      alert('The canvas is empty! Draw something first.');
      return;
    }

    console.log('Validated Drawing Data:', strokes);
  };

  return (
    <div className="w-[60ch] grid items-center gap-2 p-2">
      <Card>
        <canvas
          ref={canvasRef}
          className="cursor-crosshair w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </Card>
      <div className="flex gap-2">
        <Button onClick={clearCanvas}>Clear</Button>

        <Button onClick={handleValidate}>Validate Drawing</Button>
      </div>

      <div>Recorded Strokes: {strokes.length}</div>
    </div>
  );
}
