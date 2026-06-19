import type { GrammarRule } from '../../types';

export const cosRule = {
  id: 'cos',
  name: 'Cosine',
  arity: 1,
  weight: 1,
  evaluate: (args) => Math.cos(Math.PI * args[0]()),
  toMathString: (args) => `cos(π · ${args[0]})`,
  toGLSL: (args) => `cos(3.14159265 * ${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── cos\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'cos',
    args: [buildChild()]
  })
} satisfies GrammarRule;
