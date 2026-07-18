import { GLSL_PI } from '../../../glsl-library.js';
import { clamp } from '../../../util.js';

export const radialOp = {
  arity: 0,
  opcode: 14,
  kind: 'terminal' as const,
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
  kind: 'terminal' as const,
  label: 'sweep',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number, y: number) =>
    clamp((Math.atan2(y, x) / Math.PI) * 2.0 - 1.0),
  toGLSL: () => `(atan(p.y, p.x) / ${GLSL_PI} * 2.0 - 1.0)`,
  toMathString: () => 'sweep(p)'
};
