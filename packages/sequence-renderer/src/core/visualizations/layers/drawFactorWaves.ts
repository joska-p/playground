import { defineLayer } from '../define-layer';
import type { LayerMeta } from '../types';

type DrawFactorWavesOptions = {
  lineWidth: number;
  alpha: number;
  amplitudeScale: number;
  saturation: number;
  lightness: number;
};

const drawFactorWaves = defineLayer<DrawFactorWavesOptions>()
  .defaults({
    lineWidth: 1.5,
    alpha: 0.65,
    amplitudeScale: 0.4,
    saturation: 85,
    lightness: 55
  })
  .draw(
    (
      {
        context,
        sequence,
        maxVal,
        valueScale,
        offsetX,
        offsetY,
        containerSize
      },
      { lineWidth, alpha, amplitudeScale, saturation, lightness }
    ) => {
      const maxAmplitude = containerSize.height * amplitudeScale;

      sequence.forEach((p) => {
        if (maxVal <= 0) return;
        const amplitude = (p / maxVal) * maxAmplitude;
        const hue = (p * 137.5) % 360;

        context.save();
        context.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        context.lineWidth = lineWidth;
        context.beginPath();

        const startX = offsetX + p * valueScale;
        const endX = offsetX + maxVal * valueScale;

        for (let canvasX = startX; canvasX <= endX; canvasX++) {
          const v = (canvasX - offsetX) / valueScale;
          const y = offsetY + amplitude * Math.sin((Math.PI * (v - p)) / p);

          if (canvasX === startX) {
            context.moveTo(canvasX, y);
          } else {
            context.lineTo(canvasX, y);
          }
        }
        context.stroke();
        context.restore();
      });
    }
  );

const drawFactorWavesMeta = {
  id: 'factor-waves',
  name: 'Factor Waves',
  description: 'Per-value sine waves radiating from each point',
  definition: drawFactorWaves,
  defaultParams: {
    lineWidth: 1.5,
    alpha: 0.65,
    amplitudeScale: 0.4,
    saturation: 85,
    lightness: 55
  },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    amplitudeScale: {
      label: 'Amplitude',
      type: 'number',
      min: 0.05,
      max: 1,
      step: 0.05
    },
    saturation: {
      label: 'Saturation',
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    lightness: {
      label: 'Lightness',
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    }
  }
} satisfies LayerMeta<DrawFactorWavesOptions>;

export { drawFactorWaves, drawFactorWavesMeta };
