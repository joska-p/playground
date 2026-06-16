import { defineLayer } from '../define-layer';

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

export { drawBaseline };
