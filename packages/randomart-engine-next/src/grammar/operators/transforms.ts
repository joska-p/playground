import { GLSL_PI } from '../../glsl-library.js';
import { clamp } from '../../util.js';
import type { Operator } from './registry.js';

export const absOp = {
  arity: 1,
  kind: 'transform',
  label: 'abs',
  argNames: ['value'],
  evaluate: ({ args }) => clamp(Math.abs(args['value'] ?? 0.5) * 2 - 1),
  toGLSL: ({ args }) => `clamp(abs(${args['value'] ?? 0.5}) * 2.0 - 1.0, -1.0, 1.0)`,
  toMathString: ({ args }) => `(2·|${args['value'] ?? 0.5}| − 1)`
} as const satisfies Operator;

export const sqrtOp = {
  arity: 1,
  kind: 'transform',
  label: 'sqrt',
  argNames: ['value'],
  evaluate: ({ args }) => clamp(Math.sqrt(Math.abs(args['value'] ?? 0.5) + 1e-10)),
  toGLSL: ({ args }) => `sqrt(abs(${args['value'] ?? 0.5}) + 1e-10)`,
  toMathString: ({ args }) => `sqrt(|${args['value'] ?? 0.5}|)`
} as const satisfies Operator;

export const expOp = {
  arity: 1,
  kind: 'transform',
  label: 'exp',
  argNames: ['value'],
  evaluate: ({ args }) => {
    const val = Math.max(-1.0, Math.min(1.0, args['value'] ?? 0.5));
    return clamp(((Math.exp(val) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0);
  },
  toGLSL: ({ args }) => {
    const inner = `clamp(${args['value'] ?? 0.5}, -1.0, 1.0)`;
    return `(((exp(${inner}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`;
  },
  toMathString: ({ args }) => `normalized_e^(${args['value'] ?? 0.5})`
} as const satisfies Operator;

export const logOp = {
  arity: 1,
  kind: 'transform',
  label: 'log',
  argNames: ['value'],
  evaluate: ({ args }) => {
    const val = Math.abs(args['value'] ?? 0.5);
    return clamp((Math.log(val + 1.0) / 0.69314718056) * 2.0 - 1.0);
  },
  toGLSL: ({ args }) => `((log(abs(${args['value'] ?? 0.5}) + 1.0) / 0.69314718056) * 2.0 - 1.0)`,
  toMathString: ({ args }) => `normalized_log(${args['value'] ?? 0.5})`
} as const satisfies Operator;

export const fractOp = {
  arity: 1,
  kind: 'transform',
  label: 'fract',
  argNames: ['value'],
  evaluate: ({ args }) =>
    clamp(((args['value'] ?? 0.5) - Math.floor(args['value'] ?? 0.5)) * 2.0 - 1.0),
  toGLSL: ({ args }) => `(fract(${args['value'] ?? 0.5}) * 2.0 - 1.0)`,
  toMathString: ({ args }) => `fract(${args['value'] ?? 0.5})`
} as const satisfies Operator;

export const sinOp = {
  arity: 1,
  kind: 'transform',
  label: 'sin',
  argNames: ['value'],
  evaluate: ({ args }) => clamp(Math.sin(Math.PI * (args['value'] ?? 0.5))),
  toGLSL: ({ args }) => `sin(${GLSL_PI} * (${args['value'] ?? 0.5}))`,
  toMathString: ({ args }) => `sin(π·${args['value'] ?? 0.5})`
} as const satisfies Operator;

export const cosOp = {
  arity: 1,
  kind: 'transform',
  label: 'cos',
  argNames: ['value'],
  evaluate: ({ args }) => clamp(Math.cos(Math.PI * (args['value'] ?? 0.5))),
  toGLSL: ({ args }) => `cos(${GLSL_PI} * (${args['value'] ?? 0.5}))`,
  toMathString: ({ args }) => `cos(π·${args['value'] ?? 0.5})`
} as const satisfies Operator;
