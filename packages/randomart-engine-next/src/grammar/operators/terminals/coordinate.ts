/** Coordinate input operators — `x` and `y` are special-cased by walkers. */

export const xOp = {
  arity: 0,
  opcode: 1,
  category: 'terminal' as const,
  label: 'x',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number) => x,
  toGLSL: () => 'p.x',
  toMathString: () => 'x'
};

export const yOp = {
  arity: 0,
  opcode: 2,
  category: 'terminal' as const,
  label: 'y',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, _x: number, y: number) => y,
  toGLSL: () => 'p.y',
  toMathString: () => 'y'
};
