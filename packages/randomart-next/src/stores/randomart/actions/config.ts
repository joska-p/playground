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

export function setAnimationSpeed(speed: number): void {
  randomartStore.setState({ animationSpeed: speed }, false, 'config/setAnimationSpeed');
}

export function toggleRule(ruleId: string): void {
  updateTreeConfig((state) => {
    const isCurrentlyEnabled = state.enabledRuleIds.includes(ruleId);

    const nextEnabledIds = isCurrentlyEnabled
      ? state.enabledRuleIds.filter((id) => id !== ruleId)
      : [...state.enabledRuleIds, ruleId];

    return { enabledRuleIds: nextEnabledIds };
  }, `config/toggleRule (${ruleId})`);
}
