import type { GrammarRule } from '../types';

export const ifRule = {
  id: 'if',
  name: 'If',
  arity: 3,
  weight: 1,
  evaluate: (args) => {
    const condition = args[0]();
    return condition > 0 ? args[1]() : args[2]();
  },
  toMathString: (args) => `(if ${args[0]} > 0 ? ${args[1]} : ${args[2]})`,
  toGLSL: (args) => `(${args[0]} > 0.0 ? ${args[1]} : ${args[2]})`,
  toTreeView: (args, depth) => {
    const indent = '  '.repeat(depth);
    return `${indent}├── if\n${args[0]}${args[1]}${args[2]}`;
  },
  buildNode: (_rng, buildChild) => ({
    ruleId: 'if',
    args: [buildChild(), buildChild(), buildChild()]
  })
} satisfies GrammarRule;
