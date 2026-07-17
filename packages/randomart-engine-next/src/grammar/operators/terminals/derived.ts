/** Derived terminal operators — coordinate-space noise patterns. */

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
  toGLSL: () => {
    const GL_PI = '3.141592653589793';
    return `(atan(p.y, p.x) / ${GL_PI} * 2.0 - 1.0)`;
  },
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
  toGLSL: () => {
    const noise = (pxExpr: string, pyExpr: string) =>
      `(fract(sin(${pxExpr} * 12.9898 + ${pyExpr} * 78.233) * 43758.5453) * 2.0 - 1.0)`;
    return [
      `(( ${noise('p.x', 'p.y')}`,
      `+ 0.5 * ${noise('p.x * 2.0', 'p.y * 2.0')}`,
      `+ 0.25 * ${noise('p.x * 4.0', 'p.y * 4.0')}`,
      `+ 0.125 * ${noise('p.x * 8.0', 'p.y * 8.0')}`,
      `+ 0.0625 * ${noise('p.x * 16.0', 'p.y * 16.0')} ) * 0.67)`
    ].join('\n');
  },
  toMathString: () => 'fbm(p)'
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
  noiseDependencies: ['pseudoRecaman']
};

export const nestedOscillationOp = {
  arity: 0,
  opcode: 18,
  category: 'terminal' as const,
  label: 'nested osc.',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) =>
    clamp(Math.sin(x * Math.sin(y * Math.PI) * Math.PI)),
  toGLSL: () => {
    const GL_PI = '3.141592653589793';
    return `sin(p.x * sin(p.y * ${GL_PI}) * ${GL_PI})`;
  },
  toMathString: () => 'nested-oscillation(p)'
};
