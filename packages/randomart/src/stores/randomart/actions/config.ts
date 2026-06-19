import { getAllRules, getRule } from '../../../core/grammar/registry';
import { randomartStore } from '../store';

export function setSeedText(seedText: string): void {
  randomartStore.setState({ seedText }, false, 'config/setSeedText');
}

export function setMaxDepth(maxDepth: number): void {
  randomartStore.setState({ maxDepth }, false, 'config/setMaxDepth');
}

export function setAnimationSpeed(speed: number): void {
  randomartStore.setState(
    { animationSpeed: speed },
    false,
    'config/setAnimationSpeed'
  );
}

export function toggleRule(ruleId: string): void {
  const state = randomartStore.getState();
  const rule = getRule(ruleId);
  if (!rule) return;

  if (state.enabledRuleIds.includes(ruleId) && rule.arity === 0) {
    const otherTerminals = getAllRules().filter(
      (r) =>
        r.arity === 0 && r.id !== ruleId && state.enabledRuleIds.includes(r.id)
    );
    if (otherTerminals.length === 0) return;
  }

  const enabled = state.enabledRuleIds.includes(ruleId)
    ? state.enabledRuleIds.filter((id) => id !== ruleId)
    : [...state.enabledRuleIds, ruleId];

  randomartStore.setState(
    { enabledRuleIds: enabled },
    false,
    `config/toggleRule (${ruleId})`
  );
}
