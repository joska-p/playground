import { GLSL_PI } from '../../../glsl-library.js';
import { clamp } from '../../../util.js';

export const sinOp = {
  arity: 1,
  opcode: 7,
  kind: 'transform' as const,
  label: 'sin',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.sin(Math.PI * value)),
  toGLSL: ({ value }: { value: string }) => `sin(${GLSL_PI} * (${value}))`,
  toMathString: ({ value }: { value: string }) => `sin(π·${value})`
};

export const cosOp = {
  arity: 1,
  opcode: 8,
  kind: 'transform' as const,
  label: 'cos',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.cos(Math.PI * value)),
  toGLSL: ({ value }: { value: string }) => `cos(${GLSL_PI} * (${value}))`,
  toMathString: ({ value }: { value: string }) => `cos(π·${value})`
};
