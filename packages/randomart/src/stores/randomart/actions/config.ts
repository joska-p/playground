import { getRule } from '@repo/randomart-engine/grammar/registry';
import { randomartStore, updateTreeConfig } from '../store';

export function setSeedText(seedText: string): void {
  updateTreeConfig(() => ({ seedText }), 'config/setSeedText');
}

export function setMaxDepth(maxDepth: number): void {
  updateTreeConfig(() => ({ maxDepth }), 'config/setMaxDepth');
}

export function setAnimationSpeed(speed: number): void {
  randomartStore.setState(
    { animationSpeed: speed },
    false,
    'config/setAnimationSpeed'
  );
}

export function toggleRule(ruleId: string): void {
  updateTreeConfig((state) => {
    const rule = getRule(ruleId);
    if (!rule) return {};

    const isCurrentlyEnabled = state.enabledRuleIds.includes(ruleId);

    // Safeguard: Check if this is a terminal rule, and if disabling it leaves the pool empty
    if (isCurrentlyEnabled && rule.category === 'terminal') {
      const activeTerminalsCount = state.enabledRuleIds.filter((id) => {
        const targetRule = getRule(id);
        return targetRule && targetRule.category === 'terminal';
      }).length;

      // Block the change explicitly if it compromises the absolute fallback terminal leaf node boundary
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
