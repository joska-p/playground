import type { SequenceRule, NextStepOptions } from './types';

export type RuleConfig = {
  id: string;
  name: string;
  description: string;
  maxSteps: number;
  getNext: (options: NextStepOptions) => number;
};

export function factoryRule(config: RuleConfig): SequenceRule {
  if (!config.id) throw new Error('Rule id is required');
  if (!config.name) throw new Error('Rule name is required');
  if (config.maxSteps < 2) throw new Error('maxSteps must be >= 2');
  if (typeof config.getNext !== 'function') {
    throw new Error('getNext must be a function');
  }
  return Object.freeze({ ...config });
}
