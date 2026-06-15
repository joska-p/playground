import type { VisualizationLayer } from '../types';

export const drawRecamanArcs: VisualizationLayer = ({
  context,
  sequence,
  valueScale,
  offsetX,
  offsetY,
  textColor
}) => {
  context.save();
  context.translate(offsetX, offsetY);
  context.strokeStyle = textColor;
  context.lineWidth = 1;

  sequence.forEach((value, index) => {
    const previousValue = sequence[index - 1];
    if (index > 0 && previousValue !== undefined) {
      const middleValue = ((previousValue + value) / 2) * valueScale;
      const radius = (Math.abs(value - previousValue) / 2) * valueScale;

      context.beginPath();
      if (index % 2 === 0) {
        context.arc(middleValue, 0, radius, 0, Math.PI);
      } else {
        context.arc(middleValue, 0, radius, Math.PI, 0);
      }
      context.stroke();
    }
  });

  context.restore();
};
