import { defineLayer } from '../define-layer';
import { recamanScale } from '../scales/recaman';
import type { LayerMeta } from '../types';

type DrawRecamanArcsOptions = {
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

const drawRecamanArcsMeta = {
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  description: 'Semicircle arcs between consecutive sequence values',
  definition: drawRecamanArcs,
  defaultParams: { lineWidth: 1, alpha: 1.0, color: undefined },
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
  },
  preferredScale: recamanScale
} satisfies LayerMeta<DrawRecamanArcsOptions>;

export { drawRecamanArcs, drawRecamanArcsMeta };
