import type { GlslFunctionsIds } from '../../../glsl-library.js';
import { GLSL_PI } from '../../../glsl-library.js';
import { clamp } from '../../../util.js';

export const radialOp = {
  arity: 0,
  opcode: 14,
  category: 'terminal' as const,
  label: 'radial',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) =>
    clamp(Math.sqrt(x * x + y * y) * 2.0 - 1.0),
  toGLSL: () => `(length(p) * 2.0 - 1.0)`,
  toMathString: () => 'radial(p)'
};

export const sweepOp = {
  arity: 0,
  opcode: 15,
  category: 'terminal' as const,
  label: 'sweep',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) =>
    clamp((Math.atan2(y, x) / Math.PI) * 2.0 - 1.0),
  toGLSL: () => `(atan(p.y, p.x) / ${GLSL_PI} * 2.0 - 1.0)`,
  toMathString: () => 'sweep(p)'
};

export const fbmOp = {
  arity: 0,
  opcode: 16,
  category: 'terminal' as const,
  label: 'fbm',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) => {
    let value = 0.0;
    let amplitude = 0.5;
    let px = x;
    let py = y;
    for (let i = 0; i < 5; i++) {
      const n = Math.sin(px * 12.9898 + py * 78.233) * 43758.5453;
      value += amplitude * ((n - Math.floor(n)) * 2.0 - 1.0);
      px *= 2.0;
      py *= 2.0;
      amplitude *= 0.5;
    }
    return clamp(value);
  },
  toGLSL: () => `fbm(p)`,
  toMathString: () => 'fbmNoise(p)',
  noiseDependencies: ['fbmNoise'] as GlslFunctionsIds[]
};

export const recamanPatternOp = {
  arity: 0,
  opcode: 17,
  category: 'terminal' as const,
  label: 'recaman',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) => {
    const d = Math.sqrt(x * x + y * y);
    const step = Math.floor(d * 10.0);
    let val = 0.0;
    for (let i = 1; i < 12; i++) {
      if (i > step) break;
      const raw = Math.sin(val * 12.9898) * 43758.5453;
      const flip = raw - Math.floor(raw);
      if (flip > 0.5 && val - i > 0.0) {
        val -= i;
      } else {
        val += i;
      }
    }
    return clamp((val % 5.0) / 5.0);
  },
  toGLSL: () => `pseudoRecaman(p)`,
  toMathString: () => 'recaman(p)',
  noiseDependencies: ['pseudoRecaman'] as GlslFunctionsIds[]
};

export const nestedOscillationOp = {
  arity: 0,
  opcode: 18,
  category: 'terminal' as const,
  label: 'nested osc.',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) =>
    clamp(Math.sin(x * Math.sin(y * Math.PI) * Math.PI)),
  toGLSL: () => `sin(p.x * sin(p.y * ${GLSL_PI}) * ${GLSL_PI})`,
  toMathString: () => 'nested-oscillation(p)'
};
