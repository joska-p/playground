import type { VisualizationLayer } from '../types';

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0) return false;
  for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

export const drawFactorWaves: VisualizationLayer = ({
  context,
  sequence,
  maxVal,
  valueScale,
  offsetX,
  offsetY,
  containerSize
}) => {
  // Draw factor waves for each prime in the sequence
  const uniquePrimes = new Set<number>();
  sequence.forEach((val) => {
    if (isPrime(val)) {
      uniquePrimes.add(val);
    }
  });

  const maxAmplitude = containerSize.height * 0.4;

  uniquePrimes.forEach((p) => {
    if (maxVal <= 0) return;
    const amplitude = (p / maxVal) * maxAmplitude;
    const hue = (p * 137.5) % 360;

    context.save();
    context.strokeStyle = `hsla(${hue}, 85%, 55%, 0.65)`;
    context.lineWidth = 1.5;
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
};
