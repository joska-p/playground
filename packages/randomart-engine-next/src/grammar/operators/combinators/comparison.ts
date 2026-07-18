export const lessThanOp = {
  arity: 2,
  opcode: 24,
  kind: 'combinator' as const,
  label: '<',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => (a < b ? 1.0 : -1.0),
  toGLSL: ({ a, b }: { a: string; b: string }) => `(${a} < ${b} ? 1.0 : -1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} < ${b} ? 1 : -1)`
};

export const greaterThanOp = {
  arity: 2,
  opcode: 25,
  kind: 'combinator' as const,
  label: '>',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => (a > b ? 1.0 : -1.0),
  toGLSL: ({ a, b }: { a: string; b: string }) => `(${a} > ${b} ? 1.0 : -1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} > ${b} ? 1 : -1)`
};
