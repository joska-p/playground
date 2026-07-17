/** Flow combinator operators — `if` (ternary conditional), `mix` (blend). */

import { clamp } from '../../../util.js';

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

export const mixOp = {
  arity: 4,
  opcode: 28,
  category: 'combinator' as const,
  label: 'mix',
  argNames: ['a', 'b', 'c', 'd'] as const,
  evaluate: ({ a, b, c, d }: { a: number; b: number; c: number; d: number }) => {
    const t = clamp(((a + 1) / 2) * ((b + 1) / 2));
    return clamp(c * (1 - t) + d * t);
  },
  toGLSL: ({ a, b, c, d }: { a: string; b: string; c: string; d: string }) => {
    return `clamp(mix(${c}, ${d}, clamp((${a} + 1.0) * 0.5 * ((${b} + 1.0) * 0.5), -1.0, 1.0)), -1.0, 1.0)`;
  },
  toMathString: ({ a, b, c, d }: { a: string; b: string; c: string; d: string }) =>
    `mix(${a}, ${b}, ${c}, ${d})`
};
