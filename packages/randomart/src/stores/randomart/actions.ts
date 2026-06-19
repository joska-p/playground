import { getAllRules, getRule } from '../../core/grammar/registry';
import { SeededRandom } from '../../core/random/SeededRandom';
import { buildTree } from '../../core/tree/build';
import { randomartStore } from './store';

function getEnabledRules(): string[] {
  return randomartStore.getState().enabledRuleIds;
}

function regenerateTrees(
  seedText: string,
  maxDepth: number,
  correlated: boolean
) {
  const enabledIds = getEnabledRules();
  const rules = getAllRules().filter((r) => enabledIds.includes(r.id));

  if (correlated) {
    const rng = new SeededRandom(seedText + '_rgb');
    const tree = {
      ruleId: 'vec3',
      args: [
        buildTree(rng, 0, maxDepth, rules),
        buildTree(rng, 0, maxDepth, rules),
        buildTree(rng, 0, maxDepth, rules)
      ]
    };
    return {
      treeR: tree,
      treeG: tree,
      treeB: tree,
      rngR: rng,
      rngG: rng,
      rngB: rng
    };
  }

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
  const trees = regenerateTrees(seedText, state.maxDepth, state.correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState({ seedText, time: 0, ...trees });
}

export function setMaxDepth(maxDepth: number): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(state.seedText, maxDepth, state.correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState({ maxDepth, time: 0, ...trees });
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
      (r) =>
        r.arity === 0 && r.id !== ruleId && state.enabledRuleIds.includes(r.id)
    );
    if (otherTerminals.length === 0) return;
  }

  const enabled = state.enabledRuleIds.includes(ruleId)
    ? state.enabledRuleIds.filter((id) => id !== ruleId)
    : [...state.enabledRuleIds, ruleId];

  state.timeRef.current = 0;
  randomartStore.setState({
    enabledRuleIds: enabled,
    ...regenerateTrees(state.seedText, state.maxDepth, state.correlatedRGB),
    time: 0
  });
}

export function toggleRunning(): void {
  const state = randomartStore.getState();
  randomartStore.setState({ running: !state.running });
}

export function setRunning(running: boolean): void {
  randomartStore.setState({ running });
}

export function setTime(time: number): void {
  const state = randomartStore.getState();
  state.timeRef.current = time;
  randomartStore.setState({ time });
}

export function setRenderMode(renderMode: 'canvas' | 'glsl'): void {
  randomartStore.setState({ renderMode });
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(state.seedText, state.maxDepth, correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState({ correlatedRGB, time: 0, ...trees });
}
