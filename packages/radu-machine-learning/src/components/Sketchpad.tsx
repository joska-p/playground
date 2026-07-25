import { ControlGrid } from '@repo/ui/control-panel';
import { ColorSwatch } from '@repo/ui/data-display';
import { Button, Input, Label } from '@repo/ui/data-entry';
import { useEffect, useRef, useState } from 'react';
import { getPointCount } from '../core/api';
import type { Path, Point } from '../core/types';
import { setCurrentDrawingPathCount, setCurrentDrawingPointCount } from '../stores/store';

function Sketchpad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const [strokeColor, setStrokeColor] = useState('#fefefeff');
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<Path>([]);

  function exportPaths() {
    if (paths.length === 0) return;
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
    isDrawingRef.current = true;
    setCurrentPath([toCanvasPosition(e)]);
  }

  function handleMouseUp() {
    if (!isDrawingRef.current || currentPath.length === 0) return;

    const completedPath = currentPath;
    setPaths((prev) => {
      const newPaths = [...prev, completedPath];
      setCurrentDrawingPathCount(newPaths.length);
      setCurrentDrawingPointCount(getPointCount(newPaths));
      return newPaths;
    });

    setCurrentPath([]);
    isDrawingRef.current = false;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;
    setCurrentPath((prev) => [...prev, toCanvasPosition(e)]);
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext('2d');
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allPaths = currentPath.length > 0 ? [...paths, currentPath] : paths;

    allPaths.forEach((path) => {
      if (path.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      path.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point[0], point[1]);
        else ctx.lineTo(point[0], point[1]);
      });
      ctx.stroke();
    });
  }, [paths, currentPath, strokeColor]);

  return (
    <div className="space-y-2">
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
          size="sm"
          variant="warning"
          onClick={() => {
            setPaths((prev) => prev.slice(0, -1));
          }}
        >
          Undo
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            isDrawingRef.current = false;
            setCurrentPath([]);
            setPaths([]);
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
    </div>
  );
}

export { Sketchpad };
