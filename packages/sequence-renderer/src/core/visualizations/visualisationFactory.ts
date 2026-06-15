import type {
  DrawingContext,
  Visualization,
  VisualizationConfig
} from './types';

export function defaultScaleCalculator({
  sequence,
  containerSize
}: {
  sequence: number[];
  containerSize: { width: number; height: number };
}): number {
  const maxVal = Math.max(...sequence, 0);
  if (maxVal <= 0) return 1;
  const padding = 0.95;
  return (containerSize.width * padding) / maxVal;
}

function visualisationFactory(config: VisualizationConfig): Visualization {
  if (!config.id) throw new Error('Visualization id is required');
  if (!config.name) throw new Error('Visualization name is required');
  if (!Array.isArray(config.layers) || config.layers.length === 0) {
    throw new Error('Visualization must have at least one layer');
  }

  const calculateScale = config.calculateScale ?? defaultScaleCalculator;

  return Object.freeze({
    id: config.id,
    name: config.name,
    draw: ({ canvas, sequence }) => {
      if (!canvas.parentElement) return;

      const containerSize = {
        width: canvas.parentElement.clientWidth,
        height: canvas.parentElement.clientHeight
      };

      canvas.width = containerSize.width;
      canvas.height = containerSize.height;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.clearRect(0, 0, containerSize.width, containerSize.height);

      const maxVal = Math.max(...sequence, 0);
      const valueScale = calculateScale({ sequence, containerSize });
      const offsetX = (containerSize.width - maxVal * valueScale) / 2;
      const offsetY = containerSize.height / 2;
      const textColor = getComputedStyle(canvas).color || 'black';

      const drawContext: DrawingContext = {
        canvas,
        context,
        sequence,
        containerSize,
        maxVal,
        valueScale,
        offsetX,
        offsetY,
        textColor
      };

      config.layers.forEach((layer) => {
        layer(drawContext);
      });
    }
  });
}

export { visualisationFactory };
