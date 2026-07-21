import { useEffect, useRef } from 'react';
import { remap } from '../core/math';
import type { Point } from '../core/types';
import type { Sample } from './mockDataSamples';

type ChartProps = {
  size?: number;
  xAxes?: string;
  yAxes?: string;
  styles?: Record<string, string>;
  samples: Sample[];
};

type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function getPixelBounds(canvas: HTMLCanvasElement, margin = 0): Bounds {
  return {
    left: margin,
    right: canvas.width - margin,
    top: margin,
    bottom: canvas.height - margin
  };
}

function getDataBounds(data: Point[]): Bounds {
  const x = data.map((point) => point[0]);
  const y = data.map((point) => point[1]);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);
  return {
    left: minX,
    right: maxX,
    top: maxY,
    bottom: minY
  };
}

function remapPoint(oldBounds: Bounds, newBounds: Bounds, point: Point): Point {
  return [
    remap(oldBounds.left, oldBounds.right, newBounds.left, newBounds.right, point[0]),
    remap(oldBounds.top, oldBounds.bottom, newBounds.top, newBounds.bottom, point[1])
  ];
}

function getPixelPoint({
  pixelBounds,
  dataBounds,
  point
}: {
  pixelBounds: ReturnType<typeof getPixelBounds>;
  dataBounds: ReturnType<typeof getDataBounds>;
  point: Point;
}): Point {
  return remapPoint(dataBounds, pixelBounds, point);
}

function drawPoint(point: Point, ctx: CanvasRenderingContext2D, size = 8, color = 'white') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(point[0], point[1], size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function Chart({ size = 250, xAxes = 'x', yAxes = 'y', styles, samples }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
    ctx.globalAlpha = 0.8;

    const pixelBounds = getPixelBounds(canvasRef.current, size * 0.1);
    const dataBounds = getDataBounds(samples.map((sample) => sample.point));
    samples.forEach((sample) => {
      const point = getPixelPoint({ pixelBounds, dataBounds, point: sample.point });
      drawPoint(point, ctx);
    });
  }, [size, samples]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
    />
  );
}

export { Chart };
