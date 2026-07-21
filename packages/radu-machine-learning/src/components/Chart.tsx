import { useEffect, useRef } from 'react';
import type { Sample } from './mockDataSamples';

type ChartProps = {
  size?: number;
  xAxes?: string;
  yAxes?: string;
  styles?: Record<string, string>;
  samples: Sample[];
};

function Chart({ size = 250, xAxes = 'x', yAxes = 'y', styles, samples }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
  }, [size]);
  // TODO: implement chart
  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
    />
  );
}

export { Chart };
