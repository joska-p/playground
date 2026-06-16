import { defineGrammarRule } from '../factory';

export const terminalYRule = defineGrammarRule({
  id: 'y',
  name: 'Terminal Y',
  arity: 0,
  evaluate: () => 0,
  toMathString: () => 'y',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── y\n`,
  buildNode: () => ({ ruleId: 'y', args: [] })
});
