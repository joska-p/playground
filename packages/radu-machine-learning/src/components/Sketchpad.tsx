import { ControlGrid } from '@repo/ui/control-panel';
import { ColorSwatch } from '@repo/ui/data-display';
import { Button, Input, Label } from '@repo/ui/data-entry';
import { useEffect, useRef, useState } from 'react';
import { getPathCount, getPointCount } from '../core/api';
import type { Path, Point } from '../core/types';
import { setCurrentDrawingPathCount, setCurrentDrawingPointCount } from '../stores/radu';

function Sketchpad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentPathRef = useRef<Path | null>(null);
  const isDrawingRef = useRef(false);
  const [strokeColor, setStrokeColor] = useState('#fefefeff');
  const [paths, setPaths] = useState<Path[] | null>(null);

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
    if (!ctxRef.current) return;

    isDrawingRef.current = true;

    const point = toCanvasPosition(e);

    ctxRef.current.strokeStyle = strokeColor;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(point[0], point[1]);

    currentPathRef.current = [point];
  }

  function handleMouseUp() {
    if (!isDrawingRef.current || !currentPathRef.current) return;

    const completedPath = currentPathRef.current;
    setPaths((prev) => {
      const newPaths = prev ? [...prev, completedPath] : [completedPath];
      setCurrentDrawingPathCount(getPathCount(newPaths));
      setCurrentDrawingPointCount(getPointCount(newPaths));
      return newPaths;
    });

    currentPathRef.current = null;
    isDrawingRef.current = false;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!ctxRef.current || !isDrawingRef.current) return;

    const point = toCanvasPosition(e);

    ctxRef.current.lineTo(point[0], point[1]);
    ctxRef.current.stroke();

    currentPathRef.current = currentPathRef.current ? [...currentPathRef.current, point] : [point];
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
            currentPathRef.current = null;
            isDrawingRef.current = false;
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
    </div>
  );
}

export { Sketchpad };
