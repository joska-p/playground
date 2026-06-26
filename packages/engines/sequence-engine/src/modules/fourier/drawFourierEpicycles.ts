import type { VisualLayer } from '../../visualizations/types'; //
import { fetchFourierEpicycles } from './store';

const coordinateTrail: Array<{ x: number; y: number }> = [];
let trackedDataSignature = '';

export const drawFourierEpicycles: VisualLayer = {
  id: 'fourier-epicycles',
  name: 'Fourier Epicycles',
  description:
    'Traces high-frequency geometric vector loops utilizing Discrete Fourier Transforms.',
  category: 'drawing', //
  defaults: {
    precision: 40,
    orbitOverlays: 1,
    paceMultiplier: 1.0
  },
  params: {
    precision: { label: 'Circle Limit', type: 'number', min: 1, max: 200, step: 1 },
    orbitOverlays: {
      label: 'Show Orbits',
      type: 'boolean',
      value: false
    },
    paceMultiplier: { label: 'Animation Speed', type: 'number', min: 0.1, max: 4, step: 0.1 }
  },
  draw: (ctx, data, params, layout) => {
    const {
      precision = 40,
      orbitOverlays = 1,
      paceMultiplier = 1.0
    } = params as Record<string, number>;

    // 1. Route flat numbers array into the background worker pool
    const epicycles = fetchFourierEpicycles(data, () => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:request-draw'));
    });

    if (!epicycles || epicycles.length === 0) return;

    // Reset drawing coordinates history when user generates a brand-new dataset
    const currentDataSignature = `${data.length}:${data[0]}`;
    if (currentDataSignature !== trackedDataSignature) {
      coordinateTrail.length = 0;
      trackedDataSignature = currentDataSignature;
    }

    // 2. Compute smooth progressive runtime delta using high-res performance stamps
    const timestamp = (performance.now() / 1000) * 0.4 * paceMultiplier;

    ctx.save();
    // Center vector chain positions matching layout canvas calculations
    ctx.translate(layout.offsetX, layout.offsetY);

    let x = 0;
    let y = 0;
    const activeLimit = Math.min(epicycles.length, precision);

    // 3. Compute vector orbital branches
    for (let i = 0; i < activeLimit; i++) {
      const epi = epicycles[i];
      if (!epi) continue;
      const prevX = x;
      const prevY = y;

      // Scale vector radii uniformly via layout values scale constraints
      const radius = epi.amplitude * layout.valueScale;
      x += radius * Math.cos(epi.frequency * timestamp + epi.phase);
      y += radius * Math.sin(epi.frequency * timestamp + epi.phase);

      if (orbitOverlays === 1) {
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
      }
    }

    // 4. Capture drawing tip coordinate trails
    coordinateTrail.push({ x, y });
    if (coordinateTrail.length > 2500) coordinateTrail.shift();

    // 5. Draw trace path matching systemic canvas typography colours
    ctx.beginPath();
    if (coordinateTrail && coordinateTrail.length > 0) {
      ctx.moveTo(coordinateTrail[0]!.x, coordinateTrail[0]!.y);
      for (const coordinate of coordinateTrail) {
        ctx.lineTo(coordinate.x, coordinate.y);
      }
    }

    ctx.strokeStyle = getComputedStyle(ctx.canvas).color || '#00ffcc';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 6. Request continuous repaint loop execution without blocking the main React render pipeline
    requestAnimationFrame(() => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:request-draw'));
    });
  }
};
