import type { GrammarRule } from '../../types';

export const expRule = {
  id: 'exp',
  name: 'Exp',
  arity: 1,
  weight: 1,
  category: 'structural',
  evaluate: (args) => {
    const val = args[0]();
    return (
      ((Math.exp(val) - 0.36787944117) / (2.71828182846 - 0.36787944117)) * 2 -
      1
    );
  },
  toMathString: (args) => `normalized_e^(${args[0]})`,
  toGLSL: (args) =>
    `(((exp(${args[0]}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── exp\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'exp',
    args: [buildChild()]
  })
} satisfies GrammarRule;
