import { defineGrammarRule } from '../factory';

export const ifLessThanRule = defineGrammarRule({
  id: 'if-less-than',
  name: 'If Less Than',
  arity: 4, // 4 Arguments: [Left, Right, Then, Else]

  evaluate: (args) => {
    const left = args[0]();
    const right = args[1]();

    // Lazy execution! Only evaluate the winning branch
    return left < right ? args[2]() : args[3]();
  },

  toMathString: (args) =>
    `(if ${args[0]} < ${args[1]} ? ${args[2]} : ${args[3]})`,

  toTreeView: (args, depth) => {
    const indent = '  '.repeat(depth);
    return `${indent}├── if-less-than\n${args[0]}${args[1]}${args[2]}${args[3]}`;
  },

  buildNode: (_rng, buildChild) => ({
    ruleId: 'if-less-than',
    args: [buildChild(), buildChild(), buildChild(), buildChild()]
  })
});
