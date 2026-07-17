/** Arithmetic combinator operators — `sum`, `product`, `mod`, `pow`. */

import { clamp } from '../../../util.js';

export const sumOp = {
  arity: 2,
  opcode: 4,
  category: 'combinator' as const,
  label: 'sum',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => clamp((a + b) / 2),
  toGLSL: ({ a, b }: { a: string; b: string }) => `clamp((${a} + ${b}) * 0.5, -1.0, 1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} + ${b}) / 2`
};

export const productOp = {
  arity: 2,
  opcode: 5,
  category: 'combinator' as const,
  label: 'product',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => clamp(a * b),
  toGLSL: ({ a, b }: { a: string; b: string }) => `clamp((${a}) * (${b}), -1.0, 1.0)`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} · ${b})`
};

export const modOp = {
  arity: 2,
  opcode: 6,
  category: 'combinator' as const,
  label: 'mod',
  argNames: ['a', 'b'] as const,
  evaluate: ({ a, b }: { a: number; b: number }) => {
    if (Math.abs(b) < 1e-6) return 0;
    return clamp(a - b * Math.floor(a / b));
  },
  toGLSL: ({ a, b }: { a: string; b: string }) => `(abs(${b}) < 1e-6 ? 0.0 : mod(${a}, ${b}))`,
  toMathString: ({ a, b }: { a: string; b: string }) => `(${a} mod ${b})`
};

export const powOp = {
  arity: 2,
  opcode: 23,
  category: 'combinator' as const,
  label: 'pow',
  argNames: ['base', 'exp'] as const,
  evaluate: ({ base, exp }: { base: number; exp: number }) => {
    const ev = Math.max(-3.0, Math.min(3.0, exp));
    return clamp(Math.sign(base) * Math.pow(Math.abs(base), ev));
  },
  toGLSL: ({ base, exp }: { base: string; exp: string }) => {
    const expExpr = `clamp(${exp}, -3.0, 3.0)`;
    return `(sign(${base}) * pow(abs(${base}), ${expExpr}))`;
  },
  toMathString: ({ base, exp }: { base: string; exp: string }) => `(${base}^${exp})`
};
