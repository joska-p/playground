import type { GrammarRule } from '../../types';

export const vec3Rule = {
  id: 'vec3',
  name: 'Vec3',
  arity: 3,
  weight: 1,
  evaluate: (args) => args[0](),
  toMathString: (args) => `vec3(${args[0]}, ${args[1]}, ${args[2]})`,
  toGLSL: (args) => `vec3(${args[0]}, ${args[1]}, ${args[2]})`,
  toTreeView: (args, depth) => {
    const indent = '  '.repeat(depth);
    return `${indent}vec3\n${args[0]}${args[1]}${args[2]}`;
  },
  buildNode: (_rng, buildChild) => ({
    ruleId: 'vec3',
    args: [buildChild(), buildChild(), buildChild()]
  })
} satisfies GrammarRule;
