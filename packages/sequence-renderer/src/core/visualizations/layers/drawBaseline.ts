import { defineLayer } from '../define-layer';
import type { LayerMeta } from '../types';

type DrawBaselineOptions = {
  lineWidth: number;
  alpha: number;
  color?: string;
};

const drawBaseline = defineLayer<DrawBaselineOptions>()
  .defaults({ lineWidth: 1, alpha: 0.15, color: undefined })
  .draw(
    (
      { context, maxVal, valueScale, offsetX, offsetY, textColor },
      { lineWidth, alpha, color }
    ) => {
      context.beginPath();
      context.strokeStyle = color ?? textColor;
      context.lineWidth = lineWidth;
      context.globalAlpha = alpha;
      context.moveTo(offsetX, offsetY);
      context.lineTo(offsetX + maxVal * valueScale, offsetY);
      context.stroke();
    }
  );

const drawBaselineMeta = {
  id: 'baseline',
  name: 'Baseline',
  description: 'Horizontal line at y=0',
  definition: drawBaseline,
  defaultParams: { lineWidth: 1, alpha: 0.15, color: undefined },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  }
} satisfies LayerMeta<DrawBaselineOptions>;

export { drawBaseline, drawBaselineMeta };
