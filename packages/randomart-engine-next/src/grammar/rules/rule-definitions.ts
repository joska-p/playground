import type { OperatorId } from '../operators/registry.js';
import { OPERATORS } from '../operators/registry.js';

const allOperatorIds = Object.keys(OPERATORS) as OperatorId[];

export const classicRule = {
  id: 'classic',
  label: 'Classic',
  kind: 'classic' as const,
  operators: ['sum', 'product', 'sin', 'cos'] as OperatorId[],
  minDepth: 4,
  maxDepth: 12
};

export const paperRule = {
  id: 'paper',
  label: 'Paper',
  kind: 'classic' as const,
  operators: ['sum', 'product', 'sin', 'cos', 'exp', 'sqrt', 'div', 'mix'] as OperatorId[],
  minDepth: 4,
  maxDepth: 12
};

export const flowRule = {
  id: 'flow',
  label: 'Flow',
  kind: 'classic' as const,
  operators: ['if', 'less-than', 'greater-than', 'mix', 'sum', 'product'] as OperatorId[],
  minDepth: 4,
  maxDepth: 10
};

export const fatRule = {
  id: 'fat',
  label: 'All Operators',
  kind: 'classic' as const,
  operators: allOperatorIds,
  minDepth: 4,
  maxDepth: 11
};
