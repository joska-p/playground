/** Flow combinator operators — `if` (ternary conditional). */

export const ifOp = {
  arity: 3,
  opcode: 27,
  category: 'combinator' as const,
  label: 'if',
  argNames: ['cond', 'truthy', 'falsy'] as const,
  evaluate: ({ cond, truthy, falsy }: { cond: number; truthy: number; falsy: number }) =>
    cond > 0.0 ? truthy : falsy,
  toGLSL: ({ cond, truthy, falsy }: { cond: string; truthy: string; falsy: string }) =>
    `(${cond} > 0.0 ? ${truthy} : ${falsy})`,
  toMathString: ({ cond, truthy, falsy }: { cond: string; truthy: string; falsy: string }) =>
    `(if ${cond} > 0 ? ${truthy} : ${falsy})`
};
