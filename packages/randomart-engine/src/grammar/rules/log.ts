import type { GrammarRule } from '../../types';

export const logRule = {
  id: 'log',
  name: 'Log',
  arity: 1,
  weight: 0.8,
  category: 'structural',
  evaluate: (args) => {
    const val = Math.abs(args[0]());
    return (Math.log(val + 1.0) / 0.69314718056) * 2.0 - 1.0;
  },
  toMathString: (args) => `normalized_log(${args[0]})`,
  toGLSL: (args) => `((log(abs(${args[0]}) + 1.0) / 0.69314718056) * 2.0 - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── log\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'log',
    args: [buildChild()]
  })
} satisfies GrammarRule;
