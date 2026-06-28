import type { VisualLayer } from '../../core/types';
import { fetchFourierEpicycles } from './store';

type RenderState = {
  trail: Array<{ x: number; y: number }>;
  dataSignature: string;
  freezeTime: number;
};

const state: RenderState = {
  trail: [],
  dataSignature: '',
  freezeTime: 0
};

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
  draw: (ctx, data, params, layout) => {
    const {
      precision = 40,
      orbitOverlays = true,
      paceMultiplier = 1.0,
      isPlaying = false
    } = params as Record<string, number | boolean>;

    const pairs = new Float32Array(data.length * 2);
    for (let i = 0; i < data.length; i++) {
      pairs[2 * i] = i;
      pairs[2 * i + 1] = data[i] ?? 0;
    }

    const epicycles = fetchFourierEpicycles(pairs, () => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:request-draw'));
    });

    if (!epicycles || epicycles.length === 0) return;

    const currentSignature = `${data.length}:${data.slice(0, 5).join(',')}`;
    if (currentSignature !== state.dataSignature) {
      state.trail = [];
      state.dataSignature = currentSignature;
      state.freezeTime = 0;
    }

    const pace = paceMultiplier as number;
    if (isPlaying || state.freezeTime === 0) {
      state.freezeTime = (performance.now() / 1000) * pace;
    }
    const progress = state.freezeTime / 300;

    ctx.save();
    ctx.translate(layout.offsetX, layout.offsetY);

    let x = 0;
    let y = 0;
    const activeLimit = Math.min(epicycles.length, precision as number);

    for (let i = 0; i < activeLimit; i++) {
      const epi = epicycles[i];
      if (!epi) continue;

      const prevX = x;
      const prevY = y;

      const radius = epi.amplitude * layout.valueScale;
      x += radius * Math.cos(2 * Math.PI * epi.frequency * progress + epi.phase);
      y += radius * Math.sin(2 * Math.PI * epi.frequency * progress + epi.phase);

      if (orbitOverlays && epi.frequency > 0) {
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }

    state.trail.push({ x, y });
    if (state.trail.length > 2500) state.trail.shift();

    ctx.beginPath();
    const first = state.trail[0];
    if (first) {
      ctx.moveTo(first.x, first.y);
      for (const pt of state.trail) {
        ctx.lineTo(pt.x, pt.y);
      }
    }

    ctx.strokeStyle = getComputedStyle(ctx.canvas).color || '#00ffcc';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    requestAnimationFrame(() => {
      ctx.canvas.dispatchEvent(new CustomEvent('sequence-renderer:request-draw'));
    });
  }
};
