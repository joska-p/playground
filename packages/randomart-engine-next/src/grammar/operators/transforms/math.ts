import { clamp } from '../../../util.js';

export const absOp = {
  arity: 1,
  opcode: 9,
  kind: 'transform' as const,
  label: 'abs',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.abs(value) * 2 - 1),
  toGLSL: ({ value }: { value: string }) => `clamp(abs(${value}) * 2.0 - 1.0, -1.0, 1.0)`,
  toMathString: ({ value }: { value: string }) => `(2·|${value}| − 1)`
};

export const sqrtOp = {
  arity: 1,
  opcode: 19,
  kind: 'transform' as const,
  label: 'sqrt',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp(Math.sqrt(Math.abs(value) + 1e-10)),
  toGLSL: ({ value }: { value: string }) => `sqrt(abs(${value}) + 1e-10)`,
  toMathString: ({ value }: { value: string }) => `sqrt(|${value}|)`
};

export const expOp = {
  arity: 1,
  opcode: 20,
  kind: 'transform' as const,
  label: 'exp',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => {
    const val = Math.max(-1.0, Math.min(1.0, value));
    return clamp(((Math.exp(val) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0);
  },
  toGLSL: ({ value }: { value: string }) => {
    const inner = `clamp(${value}, -1.0, 1.0)`;
    return `(((exp(${inner}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`;
  },
  toMathString: ({ value }: { value: string }) => `normalized_e^(${value})`
};

export const logOp = {
  arity: 1,
  opcode: 21,
  kind: 'transform' as const,
  label: 'log',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => {
    const val = Math.abs(value);
    return clamp((Math.log(val + 1.0) / 0.69314718056) * 2.0 - 1.0);
  },
  toGLSL: ({ value }: { value: string }) =>
    `((log(abs(${value}) + 1.0) / 0.69314718056) * 2.0 - 1.0)`,
  toMathString: ({ value }: { value: string }) => `normalized_log(${value})`
};

export const fractOp = {
  arity: 1,
  opcode: 22,
  kind: 'transform' as const,
  label: 'fract',
  argNames: ['value'] as const,
  evaluate: ({ value }: { value: number }) => clamp((value - Math.floor(value)) * 2.0 - 1.0),
  toGLSL: ({ value }: { value: string }) => `(fract(${value}) * 2.0 - 1.0)`,
  toMathString: ({ value }: { value: string }) => `fract(${value})`
};
