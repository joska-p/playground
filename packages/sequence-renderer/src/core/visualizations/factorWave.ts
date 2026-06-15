import type { Visualization } from './types';

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0) return false;
  for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function draw({
  canvas,
  sequence
}: {
  canvas: HTMLCanvasElement;
  sequence: number[];
}): void {
  if (!canvas.parentElement) return;

  const containerSize = {
    width: canvas.parentElement.clientWidth,
    height: canvas.parentElement.clientHeight
  };
  canvas.width = containerSize.width;
  canvas.height = containerSize.height;

  const context = canvas.getContext('2d');
  if (!context) return;

  // Clear previous drawings
  context.clearRect(0, 0, containerSize.width, containerSize.height);

  const maxVal = Math.max(...sequence, 0);
  if (maxVal <= 0) return;

  const padding = 0.95;
  const valueScale = (containerSize.width * padding) / maxVal;
  const offsetX = (containerSize.width - maxVal * valueScale) / 2;
  const centerY = containerSize.height / 2;

  const textColor = getComputedStyle(canvas).color || 'black';

  // Draw the baseline
  context.save();
  context.beginPath();
  context.strokeStyle = textColor;
  context.lineWidth = 1;
  context.globalAlpha = 0.15;
  context.moveTo(offsetX, centerY);
  context.lineTo(offsetX + maxVal * valueScale, centerY);
  context.stroke();
  context.restore();

  // Draw sequence points on the baseline
  context.save();
  context.fillStyle = textColor;
  context.globalAlpha = 0.4;
  const plottedPoints = new Set<number>();
  sequence.forEach((val) => {
    if (!plottedPoints.has(val)) {
      plottedPoints.add(val);
      const x = offsetX + val * valueScale;
      context.beginPath();
      context.arc(x, centerY, 3, 0, 2 * Math.PI);
      context.fill();
    }
  });
  context.restore();

  // Draw factor waves for each prime in the sequence
  const uniquePrimes = new Set<number>();
  sequence.forEach((val) => {
    if (isPrime(val)) {
      uniquePrimes.add(val);
    }
  });

  const maxAmplitude = containerSize.height * 0.4;

  uniquePrimes.forEach((p) => {
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
      const y = centerY + amplitude * Math.sin((Math.PI * (v - p)) / p);

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

export const factorWave: Visualization = {
  id: 'factor-wave',
  name: 'Factor Wave',
  draw
};
