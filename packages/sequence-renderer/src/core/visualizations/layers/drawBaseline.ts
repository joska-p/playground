import type { VisualizationLayer } from '../types';

export type DrawBaselineOptions = {
  lineWidth?: number;
  alpha?: number;
  color?: string;
};

export const createDrawBaseline = (
  options: DrawBaselineOptions = {}
): VisualizationLayer => {
  const { lineWidth = 1, alpha = 0.15, color } = options;

  return ({
    context,
    maxVal,
    valueScale,
    offsetX,
    offsetY,
    textColor
  }) => {
    context.save();
    context.beginPath();
    context.strokeStyle = color ?? textColor;
    context.lineWidth = lineWidth;
    context.globalAlpha = alpha;
    context.moveTo(offsetX, offsetY);
    context.lineTo(offsetX + maxVal * valueScale, offsetY);
    context.stroke();
    context.restore();
  };
};

export const drawBaseline: VisualizationLayer = createDrawBaseline();
