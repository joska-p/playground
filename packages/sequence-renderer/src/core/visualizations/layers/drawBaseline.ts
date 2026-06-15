import type { VisualizationLayer } from '../types';

export const drawBaseline: VisualizationLayer = ({
  context,
  maxVal,
  valueScale,
  offsetX,
  offsetY,
  textColor
}) => {
  context.save();
  context.beginPath();
  context.strokeStyle = textColor;
  context.lineWidth = 1;
  context.globalAlpha = 0.15;
  context.moveTo(offsetX, offsetY);
  context.lineTo(offsetX + maxVal * valueScale, offsetY);
  context.stroke();
  context.restore();
};
