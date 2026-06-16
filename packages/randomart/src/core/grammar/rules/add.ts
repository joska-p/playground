import { defineGrammarRule } from '../factory';

export const addRule = defineGrammarRule({
  id: 'add',
  name: 'Add',
  arity: 2,
  evaluate: (args) => (args[0] + args[1]) / 2,
  toMathString: (args) => `((${args[0]} + ${args[1]}) / 2)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── add\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'add',
    args: [buildChild(), buildChild()]
  })
});
