import { getAllRules, getRule } from '../../../core/grammar/registry';
import { randomartStore } from '../store';
import { regenerateTrees } from './trees';

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

  state.timeRef.current = 0;
  randomartStore.setState(
    {
      enabledRuleIds: enabled,
      ...regenerateTrees(state.seedText, state.maxDepth, state.correlatedRGB),
      time: 0
    },
    false,
    `rules/toggleRule (${ruleId})`
  );
}
