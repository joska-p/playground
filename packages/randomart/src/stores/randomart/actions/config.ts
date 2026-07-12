import type { RuleId } from '@repo/randomart-engine/grammar/registry';
import { getInitialWeights, getRule } from '@repo/randomart-engine/grammar/registry';
import { randomartStore, updateTreeConfig } from '../store';

export function setSeedText(seedText: string): void {
  updateTreeConfig(() => ({ seedText }), 'config/setSeedText');
}

export function setMaxDepth(maxDepth: number): void {
  updateTreeConfig(() => ({ maxDepth }), 'config/setMaxDepth');
}

export function setAnimationSpeed(speed: number): void {
  randomartStore.setState({ animationSpeed: speed }, false, 'config/setAnimationSpeed');
}

export function toggleRule(ruleId: RuleId): void {
  updateTreeConfig((state) => {
    const rule = getRule(ruleId);
    if (!rule) return {};

    const isCurrentlyEnabled = state.enabledRuleIds.includes(ruleId);

    if (isCurrentlyEnabled && rule.category === 'terminal') {
      const activeTerminalsCount = state.enabledRuleIds.filter((id) => {
        const targetRule = getRule(id);
        return targetRule?.category === 'terminal';
      }).length;

      if (activeTerminalsCount <= 1) {
        return {};
      }
    }

    const nextEnabledIds = isCurrentlyEnabled
      ? state.enabledRuleIds.filter((id) => id !== ruleId)
      : [...state.enabledRuleIds, ruleId];

    return { enabledRuleIds: nextEnabledIds };
  }, `config/toggleRule (${ruleId})`);
}

export function setRuleWeight(ruleId: string, weight: number): void {
  updateTreeConfig(
    (state) => ({
      ruleWeights: { ...state.ruleWeights, [ruleId]: weight }
    }),
    `config/setRuleWeight (${ruleId})`
  );
}

export function resetAllWeights(): void {
  const ruleWeights = getInitialWeights();
  updateTreeConfig(() => ({ ruleWeights }), 'config/resetAllWeights');
}
