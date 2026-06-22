import type { GrammarRule } from '../../types';

export const cosRule = {
  id: 'cos',
  name: 'Cosine',
  arity: 1,
  weight: 1.0,
  category: 'structural',
  evaluate: (args) => Math.cos(Math.PI * args[0]()),
  toMathString: (args) => `cos(π · ${args[0]})`,
  toGLSL: (args) => `cos(3.1415926535 * ${args[0]})`, // Higher precision PI
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── cos\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'cos',
    args: [buildChild()]
  })
} satisfies GrammarRule;
