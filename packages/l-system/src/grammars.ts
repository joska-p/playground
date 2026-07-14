import {
  deterministicRule,
  parametricRule,
  stochasticRule,
  symbol
} from '@repo/l-system-engine/engine';
import type { Grammar } from '@repo/l-system-engine/types';

export const GRUVBOX_DEPTH = [
  '#b8bb26',
  '#98971a',
  '#d79921',
  '#d65d0e',
  '#cc241d',
  '#b16286',
  '#458588',
  '#689d6a'
] as const;

export type GrammarDef = {
  id: string;
  name: string;
  description: string;
  grammar: Grammar;
  defaultAngle: number;
  defaultStepLength: number;
  maxIterations: number;
};

export const GRAMMARS: GrammarDef[] = [
  {
    id: 'koch',
    name: 'Koch Curve',
    description: 'Classic snowflake curve \u2014 deterministic rule',
    grammar: {
      axiom: [symbol('F')],
      rules: [
        deterministicRule('F', [
          symbol('F'),
          symbol('+'),
          symbol('F'),
          symbol('-'),
          symbol('F'),
          symbol('-'),
          symbol('F'),
          symbol('+'),
          symbol('F')
        ])
      ]
    },
    defaultAngle: 90,
    defaultStepLength: 0.5,
    maxIterations: 6
  },
  {
    id: 'tree',
    name: 'Fractal Tree',
    description: 'Binary branching tree \u2014 deterministic rule',
    grammar: {
      axiom: [symbol('F')],
      rules: [
        deterministicRule('F', [
          symbol('F'),
          symbol('['),
          symbol('+'),
          symbol('F'),
          symbol(']'),
          symbol('F'),
          symbol('['),
          symbol('-'),
          symbol('F'),
          symbol(']'),
          symbol('F')
        ])
      ]
    },
    defaultAngle: 25,
    defaultStepLength: 0.4,
    maxIterations: 7
  },
  {
    id: 'plant',
    name: 'Dragon Plant',
    description: 'Intricate plant-like form \u2014 deterministic rule',
    grammar: {
      axiom: [symbol('F')],
      rules: [
        deterministicRule('F', [
          symbol('F'),
          symbol('F'),
          symbol('-'),
          symbol('['),
          symbol('-'),
          symbol('F'),
          symbol('+'),
          symbol('F'),
          symbol('+'),
          symbol('F'),
          symbol(']'),
          symbol('+'),
          symbol('['),
          symbol('+'),
          symbol('F'),
          symbol('-'),
          symbol('F'),
          symbol('-'),
          symbol('F'),
          symbol(']')
        ])
      ]
    },
    defaultAngle: 22.5,
    defaultStepLength: 0.3,
    maxIterations: 6
  },
  {
    id: 'parametric',
    name: 'Parametric Tree',
    description: 'Shrinking branches via parametric rule and guard',
    grammar: {
      axiom: [symbol('F', 1)],
      rules: [
        parametricRule({
          name: 'F',
          guard: ([l]) => (l ?? 0) > 0.02,
          produce: ([l = 0]) => [
            symbol('F', l * 0.6),
            symbol('['),
            symbol('+'),
            symbol('F', l * 0.6),
            symbol(']'),
            symbol('F', l * 0.6),
            symbol('['),
            symbol('-'),
            symbol('F', l * 0.6),
            symbol(']')
          ]
        }),
        parametricRule({
          name: 'F',
          guard: ([l]) => (l ?? 0) <= 0.02,
          produce: () => [symbol('F', 0.02)]
        })
      ]
    },
    defaultAngle: 25,
    defaultStepLength: 1,
    maxIterations: 8
  },
  {
    id: 'stochastic',
    name: 'Stochastic Tree',
    description: 'Randomized branching \u2014 same seed yields same tree',
    grammar: {
      axiom: [symbol('F')],
      rules: [
        stochasticRule('F', [
          {
            weight: 0.7,
            produce: [
              symbol('F'),
              symbol('['),
              symbol('+'),
              symbol('F'),
              symbol(']'),
              symbol('F'),
              symbol('['),
              symbol('-'),
              symbol('F'),
              symbol(']'),
              symbol('F')
            ]
          },
          {
            weight: 0.3,
            produce: [symbol('F'), symbol('['), symbol('+'), symbol('F'), symbol(']'), symbol('F')]
          }
        ])
      ]
    },
    defaultAngle: 22.5,
    defaultStepLength: 0.4,
    maxIterations: 6
  }
];
