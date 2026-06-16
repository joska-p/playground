import { defineGrammarRule } from '../factory';

export const terminalXRule = defineGrammarRule({
  id: 'x',
  name: 'Terminal X',
  arity: 0,
  evaluate: () => 0,
  toMathString: () => 'x',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── x\n`,
  buildNode: () => ({ ruleId: 'x', args: [] })
});
