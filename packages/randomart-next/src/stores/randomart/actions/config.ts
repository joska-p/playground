import { getRule } from '@repo/randomart-engine-next';
import type { ColorSpaceId, OperatorId, RuleId } from '@repo/randomart-engine-next/types';
import { randomartStore, updateTreeConfig } from '../store';
import type { Mode } from '../types';

export function setMode(mode: Mode): void {
  randomartStore.setState({ mode }, false, 'config/setMode');
}

export function setSeedText(seedText: string): void {
  updateTreeConfig(() => ({ seedText }), 'config/setSeedText');
}

export function setMaxDepth(maxDepth: number): void {
  updateTreeConfig(() => ({ maxDepth }), 'config/setMaxDepth');
}

export function setMinDepth(minDepth: number): void {
  updateTreeConfig(() => ({ minDepth }), 'config/setMinDepth');
}

export function setAnimationSpeed(speed: number): void {
  randomartStore.setState({ animationSpeed: speed }, false, 'config/setAnimationSpeed');
}

export function setColorSpace(colorSpace: ColorSpaceId): void {
  randomartStore.setState({ colorSpace }, false, 'config/setColorSpace');
}

export function selectRule(ruleId: RuleId): void {
  const rule = getRule(ruleId);
  updateTreeConfig(
    () => ({
      selectedRuleId: ruleId,
      customOperators: null,
      minDepth: rule.minDepth,
      maxDepth: rule.maxDepth
    }),
    `config/selectRule (${ruleId})`
  );
}

export function toggleOperator(operatorId: OperatorId): void {
  updateTreeConfig((state) => {
    const rule = getRule(state.selectedRuleId);
    const base = state.customOperators ?? rule.operators;
    const isCurrentlyEnabled = base.includes(operatorId);

    const nextOperators = isCurrentlyEnabled
      ? base.filter((id) => id !== operatorId)
      : [...base, operatorId];

    return { customOperators: nextOperators };
  }, `config/toggleOperator (${operatorId})`);
}
