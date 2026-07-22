import { useEffect, useRef } from 'react';
import { drawPoint, getDataBounds, getPixelBounds, getPixelPoint } from './helpers';

type ChartProps = {
  size?: number;
  xAxes?: string;
  yAxes?: string;
  styles?: Record<string, string>;
  data: [number, number][];
};

function Chart({ size = 250, xAxes = 'x', yAxes = 'y', styles, data }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
    ctx.globalAlpha = 0.8;

    const pixelBounds = getPixelBounds(canvasRef.current, size * 0.1);
    const dataBounds = getDataBounds(data);
    data.forEach((dataPoint) => {
      const pixelPoint = getPixelPoint({ pixelBounds, dataBounds, point: dataPoint });
      drawPoint(pixelPoint, ctx);
    });
  }, [size, data]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
    />
  );
}

export { Chart };
