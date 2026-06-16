import { defineLayer } from '../define-layer';

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0) return false;
  for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

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
      const uniquePrimes = new Set<number>();
      sequence.forEach((val) => {
        if (isPrime(val)) {
          uniquePrimes.add(val);
        }
      });

      const maxAmplitude = containerSize.height * amplitudeScale;

      uniquePrimes.forEach((p) => {
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
          // The wave crosses 0 at p, 2p, 3p, etc.
          // So Math.sin(Math.PI * (v - p) / p) is 0 at v = p, 2p, 3p...
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

export { drawFactorWaves };
