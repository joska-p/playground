import { SeededRandom } from '../../core/SeededRandom';
import { getAllRules, getRule } from '../../core/grammar/registry';
import { buildTree } from '../../core/engine';
import { randomartStore } from './store';

function getEnabledRules(): string[] {
  return randomartStore.getState().enabledRuleIds;
}

function regenerateTrees(seedText: string, maxDepth: number) {
  const enabledIds = getEnabledRules();
  const rules = getAllRules().filter((r) => enabledIds.includes(r.id));
  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth, rules);
  const treeG = buildTree(rngG, 0, maxDepth, rules);
  const treeB = buildTree(rngB, 0, maxDepth, rules);

  return { treeR, treeG, treeB, rngR, rngG, rngB };
}

export function setSeedText(seedText: string): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(seedText, state.maxDepth);
  randomartStore.setState({ seedText, ...trees });
}

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState({ activeChannel: channel });
}

export function toggleRule(ruleId: string): void {
  const state = randomartStore.getState();
  const rule = getRule(ruleId);
  if (!rule) return;

  if (state.enabledRuleIds.includes(ruleId) && rule.arity === 0) {
    const otherTerminals = getAllRules().filter(
      (r) => r.arity === 0 && r.id !== ruleId && state.enabledRuleIds.includes(r.id)
    );
    if (otherTerminals.length === 0) return;
  }

  const enabled = state.enabledRuleIds.includes(ruleId)
    ? state.enabledRuleIds.filter((id) => id !== ruleId)
    : [...state.enabledRuleIds, ruleId];

  const rules = getAllRules().filter((r) => enabled.includes(r.id));
  const rngR = new SeededRandom(state.seedText + '_red');
  const rngG = new SeededRandom(state.seedText + '_green');
  const rngB = new SeededRandom(state.seedText + '_blue');

  const treeR = buildTree(rngR, 0, state.maxDepth, rules);
  const treeG = buildTree(rngG, 0, state.maxDepth, rules);
  const treeB = buildTree(rngB, 0, state.maxDepth, rules);

  randomartStore.setState({
    enabledRuleIds: enabled,
    treeR,
    treeG,
    treeB,
    rngR,
    rngG,
    rngB
  });
}
