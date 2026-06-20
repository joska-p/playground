import { useEffect, useRef } from 'react';
import { StageContext, type Viewport } from '../core/StageContext';
import { drawAxis } from './draw/drawAxis';
import { drawExpressions } from './draw/drawExpressions';
import { drawTicks } from './draw/drawTicks';

const view: Viewport = {
  xMin: -5,
  xMax: 5,
  yMin: -3,
  yMax: 3
};

function Fracture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set pixel dimensions
    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stage = new StageContext(view, width, height);
    const layerProps = { ctx, stage };

    ctx.clearRect(0, 0, width, height);

    drawAxis(layerProps);
    drawTicks({ ...layerProps, stepX: 1, stepY: 0.5 });
    drawExpressions({
      ...layerProps,
      layers: [
        { formula: (x) => Math.sin(x), color: '#3b82f6' },
        { formula: (x) => Math.cos(x) * 2, color: '#ef4444' },
        { formula: (x) => Math.tan(x), color: '#10b981' },
        { formula: (x) => Math.log(x), color: '#eab308' }
      ]
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
    />
  );
}

export { Fracture };
