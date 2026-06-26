import type { VisualLayer } from '../../visualizations/types';
import { fetchFourierEpicycles } from './store';

const coordinateTrail: Array<{ x: number; y: number }> = [];
let trackedDataSignature = '';
let frozenTimestamp = 0;

export const drawFourierEpicycles: VisualLayer = {
  id: 'fourier-epicycles',
  name: 'Fourier Epicycles',
  description:
    'Traces high-frequency geometric vector loops utilizing Discrete Fourier Transforms.',
  category: 'drawing',
  defaults: {
    precision: 40,
    orbitOverlays: true,
    paceMultiplier: 1.0
  },
  params: {
    precision: { label: 'Circle Limit', type: 'number', min: 1, max: 200, step: 1 },
    orbitOverlays: {
      label: 'Show Orbits',
      type: 'boolean',
      value: true
    },
    paceMultiplier: { label: 'Animation Speed', type: 'number', min: 0.1, max: 3, step: 0.1 }
  },
  draw: (ctx, data, params) => {
    const {
      precision = 40,
      orbitOverlays = true,
      paceMultiplier = 1.0
    } = params as Record<string, number>;

    const pairs = new Float32Array(data.length * 2);
    for (let i = 0; i < data.length; i++) {
      pairs[2 * i] = i;
      pairs[2 * i + 1] = data[i] ?? 0;
    }

    const epicycles = fetchFourierEpicycles(pairs, () => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:request-draw'));
    });

    if (!epicycles || epicycles.length === 0) return;

    const currentDataSignature = `${data.length}:${data.slice(0, 5).join(',')}`;
    if (currentDataSignature !== trackedDataSignature) {
      coordinateTrail.length = 0;
      trackedDataSignature = currentDataSignature;
    }

    const isPlaying = (params as Record<string, unknown>)['_isPlaying'] === true;
    if (isPlaying || frozenTimestamp === 0) {
      frozenTimestamp = (performance.now() / 1000) * paceMultiplier;
    }
    const progress = frozenTimestamp / 300;

    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

    let x = 0;
    let y = 0;
    const activeLimit = Math.min(epicycles.length, precision);

    let amplitudeSum = 0;
    for (let i = 0; i < activeLimit; i++) {
      const epi = epicycles[i];
      if (epi) amplitudeSum += epi.amplitude;
    }
    const fitScale =
      amplitudeSum > 0 ? (Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4) / amplitudeSum : 1;

    for (let i = 0; i < activeLimit; i++) {
      const epi = epicycles[i];
      if (!epi) continue;

      const prevX = x;
      const prevY = y;

      const radius = epi.amplitude * fitScale;
      x += radius * Math.cos(2 * Math.PI * epi.frequency * progress + epi.phase);
      y += radius * Math.sin(2 * Math.PI * epi.frequency * progress + epi.phase);

      if (orbitOverlays && epi.frequency > 0) {
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; // Softened the orbit rings
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Softened the spokes
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }

    coordinateTrail.push({ x, y });
    if (coordinateTrail.length > 2500) coordinateTrail.shift();

    ctx.beginPath();
    if (coordinateTrail.length > 0) {
      ctx.moveTo(coordinateTrail[0]!.x, coordinateTrail[0]!.y);
      for (const coordinate of coordinateTrail) {
        ctx.lineTo(coordinate.x, coordinate.y);
      }
    }

    ctx.strokeStyle = getComputedStyle(ctx.canvas).color || '#00ffcc';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
};
