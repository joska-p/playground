import { defineGrammarRule } from '../factory';

export const sinRule = defineGrammarRule({
  id: 'sin',
  name: 'Sine',
  arity: 1,
  evaluate: (args) => Math.sin(Math.PI * args[0]()),
  toMathString: (args) => `sin(π · ${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── sin\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'sin',
    args: [buildChild()]
  })
});
