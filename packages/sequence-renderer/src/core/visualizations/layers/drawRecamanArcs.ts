import { defineLayer } from '../layerFactory';

export type DrawRecamanArcsOptions = {
  lineWidth: number;
  alpha: number;
  color?: string;
};

const drawRecamanArcs = defineLayer<DrawRecamanArcsOptions>()
  .defaults({ lineWidth: 1, alpha: 1.0, color: undefined })
  .draw(
    (
      { context, sequence, offsetX, offsetY, valueScale, textColor },
      { lineWidth, alpha, color }
    ) => {
      context.save();
      context.translate(offsetX, offsetY);
      context.strokeStyle = color ?? textColor;
      context.lineWidth = lineWidth;
      context.globalAlpha = alpha;

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
    }
  );

export { drawRecamanArcs };
