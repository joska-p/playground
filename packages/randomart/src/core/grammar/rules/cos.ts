import { defineGrammarRule } from '../factory';

export const cosRule = defineGrammarRule({
  id: 'cos',
  name: 'Cosine',
  arity: 1,
  evaluate: (args) => Math.cos(Math.PI * args[0]),
  toMathString: (args) => `cos(π · ${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── cos\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'cos',
    args: [buildChild()]
  })
});
