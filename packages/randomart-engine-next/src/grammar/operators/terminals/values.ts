/** Value input operators — `const` is special-cased by walkers. */

import { clamp } from '../../../util.js';

export const constOp = {
  arity: 0,
  opcode: 3,
  category: 'terminal' as const,
  label: 'const',
  argNames: [] as const,
  evaluate: () => 0,
  toGLSL: () => '0.0',
  toMathString: () => '0'
};

export const randomOp = {
  arity: 0,
  opcode: 13,
  category: 'terminal' as const,
  label: 'random',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) => {
    const dot = Math.abs(x) * 12.9898 + Math.abs(y) * 78.233;
    const val = Math.sin(dot) * 43758.5453;
    return clamp((val - Math.floor(val)) * 2.0 - 1.0);
  },
  toGLSL: () => `(fract(sin(abs(p.x) * 12.9898 + abs(p.y) * 78.233) * 43758.5453) * 2.0 - 1.0)`,
  toMathString: () => 'random(p)'
};
