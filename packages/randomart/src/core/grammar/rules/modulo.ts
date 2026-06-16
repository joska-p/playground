import { defineGrammarRule } from '../factory';

export const moduloRule = defineGrammarRule({
  id: 'modulo',
  name: 'Modulo',
  arity: 2,
  evaluate: (args) => (args[1]() === 0 ? 0 : args[0]() % args[1]()),
  toMathString: (args) => `(${args[0]} % ${args[1]})`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── modulo\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'modulo',
    args: [buildChild(), buildChild()]
  })
});
