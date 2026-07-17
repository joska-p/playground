/** Comparison combinator operators — `less-than`, `greater-than`, `step`. */

export const lessThanOp = {
  arity: 2,
  opcode: 24,
  category: 'combinator' as const,
  label: '<',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => (a < b ? 1.0 : -1.0),
  toGLSL: ({ a, b }: { a: string; b: string }) => `(${a} < ${b} ? 1.0 : -1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} < ${b} ? 1 : -1)`
};

export const greaterThanOp = {
  arity: 2,
  opcode: 25,
  category: 'combinator' as const,
  label: '>',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => (a > b ? 1.0 : -1.0),
  toGLSL: ({ a, b }: { a: string; b: string }) => `(${a} > ${b} ? 1.0 : -1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} > ${b} ? 1 : -1)`
};

export const stepOp = {
  arity: 2,
  opcode: 26,
  category: 'combinator' as const,
  label: 'step',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => (a >= b ? 1.0 : -1.0),
  toGLSL: ({ a, b }: { a: string; b: string }) => `(2.0 * step(${a}, ${b}) - 1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `step(${a}, ${b})`
};
