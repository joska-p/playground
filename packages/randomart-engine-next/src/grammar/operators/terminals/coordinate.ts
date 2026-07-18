export const xOp = {
  arity: 0,
  opcode: 1,
  kind: 'terminal' as const,
  label: 'x',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, x: number) => x,
  toGLSL: () => 'p.x',
  toMathString: () => 'x'
};

export const yOp = {
  arity: 0,
  opcode: 2,
  kind: 'terminal' as const,
  label: 'y',
  argNames: [] as const,
  evaluate: (_args: Record<string, number>, _x: number, y: number) => y,
  toGLSL: () => 'p.y',
  toMathString: () => 'y'
};
