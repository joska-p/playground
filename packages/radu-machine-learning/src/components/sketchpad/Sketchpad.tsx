import { ControlGrid, ControlPanel } from '@repo/ui/control-panel';
import { ColorSwatch } from '@repo/ui/data-display';
import { Button, Input, Label } from '@repo/ui/data-entry';
import { useEffect, useRef, useState } from 'react';

type Point = [number, number];
type Path = Point[];
type Paths = Path[];

function Sketchpad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeColor, setStrokeColor] = useState('#fefefeff');
  const [paths, setPaths] = useState<Paths | null>(null);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  function exportPaths() {
    if (!paths) return;
    const data = JSON.stringify(paths);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paths.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function toCanvasPosition(e: React.MouseEvent<HTMLCanvasElement>): Point {
    if (!canvasRef.current) return [0, 0];
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasRef.current) return;

    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const point = toCanvasPosition(e);

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(point[0], point[1]);

    setCurrentPath([point]);
  }

  function handleMouseUp() {
    if (!isDrawing || !currentPath) return;

    setPaths((prev) => (prev ? [...prev, currentPath] : [currentPath]));
    setCurrentPath(null);
    setIsDrawing(false);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasRef.current || !isDrawing) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const point = toCanvasPosition(e);

    ctx.lineTo(point[0], point[1]);
    ctx.stroke();

    setCurrentPath((prev) => (prev ? [...prev, point] : [point]));
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (!paths) return;

    paths.forEach((path) => {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      path.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point[0], point[1]);
        else ctx.lineTo(point[0], point[1]);
      });
      ctx.stroke();
    });
  }, [paths, strokeColor]);

  return (
    <ControlPanel size="lg">
      <ControlGrid columns={4}>
        <Label className="flex items-center gap-2">
          <Input
            className="sr-only"
            type="color"
            value={strokeColor}
            onChange={(e) => {
              setStrokeColor(e.target.value);
            }}
          />
          <ColorSwatch
            color={strokeColor}
            name="color"
            token={strokeColor}
          />
        </Label>

        <Button
          variant="warning"
          onClick={() => {
            if (!paths) return;
            setPaths(paths.slice(0, -1));
          }}
        >
          undo
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            setCurrentPath(null);
            setPaths(null);
          }}
        >
          Clear
        </Button>

        <Button
          size="sm"
          variant="primary"
          onClick={exportPaths}
        >
          Export
        </Button>
      </ControlGrid>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-background aspect-square w-full"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </ControlPanel>
  );
}

export { Sketchpad };
