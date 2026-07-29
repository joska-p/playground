import { createGrid, seedGrid } from '@repo/automa-engine/grid';
import { getRule } from '@repo/automa-engine/rules/registry';
import { getEngine, onEngineReady } from '../../core/gpu/engineRegistry';
import { uiStore } from '../ui/store';
import { simulationStore } from './store';

type SimulationInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

const init = (opts: SimulationInit): void => {
  const grid = createGrid(opts.rows, opts.cols);
  seedGrid(grid, opts.initialDensity, opts.seed);

  onEngineReady(() => {
    const engine = getEngine();
    if (!engine) return;
    engine.resize(opts.cols, opts.rows);
    engine.init(grid);
  });

  simulationStore.setState({
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,
    generation: 0
  });
};

const destroy = (): void => {
  // engine lifecycle is managed by CellMesh
};

const step = (): void => {
  const state = simulationStore.getState();
  const rule = getRule(state.ruleId);
  const engine = getEngine();
  if (!engine) return;
  engine.step(rule);
  simulationStore.setState({ generation: state.generation + 1 });
};

const setRule = (ruleId: string): void => {
  simulationStore.setState({ ruleId });

  const rule = getRule(ruleId);
  const { stateColors } = uiStore.getState();
  if (rule.stateCount > stateColors.length) {
    const next = [...stateColors];
    for (let i = stateColors.length; i < rule.stateCount; i++) {
      next[i] = '#000000';
    }
    uiStore.setState({ stateColors: next });
  }
};

export { destroy, init, setRule, step };
