/** Trigonometric transform operators — `sin` and `cos`. */

const GL_PI = '3.141592653589793';

const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

export const sinOp = {
  arity: 1,
  opcode: 7,
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.sin(Math.PI * value)),
  toGLSL: ({ value }: { value: string }) => `sin(${GL_PI} * (${value}))`,
  toMathString: ({ value }: { value: string }) => `sin(π·${value})`
};

export const cosOp = {
  arity: 1,
  opcode: 8,
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.cos(Math.PI * value)),
  toGLSL: ({ value }: { value: string }) => `cos(${GL_PI} * (${value}))`,
  toMathString: ({ value }: { value: string }) => `cos(π·${value})`
};
