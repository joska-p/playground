import type { CreatureId } from '../engine/creature/registry';
import { getSimulationEngine } from '../engine/gpu/SimulationEngine';
import { rules, type RuleId } from '../engine/rules/registry';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { DEFAULT_STATE_COLORS } from '../lib/constants';
import { computeDerivedColors } from '../lib/colors';

export type BrushMode = 'draw' | 'erase';

const automaStore = createStore<{
    toolMode: BrushMode;
    stateColors: string[];
    paletteBrush: CreatureId | 'pixel';
}>(() => ({
    toolMode: 'draw',
    stateColors: [...DEFAULT_STATE_COLORS],
    paletteBrush: 'pixel'
}));

const useBrushMode = () => useStore(automaStore, (s) => s.toolMode);
const useStateColors = () => useStore(automaStore, (s) => s.stateColors);
const usePaletteBrush = () => useStore(automaStore, (s) => s.paletteBrush);

const setToolMode = (mode: BrushMode): void => {
    automaStore.setState({ toolMode: mode });
};

const setPaletteBrush = (id: CreatureId | 'pixel'): void => {
    automaStore.setState({ paletteBrush: id });
};

const setRule = (id: RuleId): void => {
    const engine = getSimulationEngine();
    engine.setRule(id);
    const rule = rules[id];
    const { stateColors } = automaStore.getState();
    const deadColor = stateColors[0] ?? '#070a14';
    const aliveColor = stateColors[1] ?? '#d97706';
    const nextColors = computeDerivedColors(rule.stateCount, deadColor, aliveColor);
    automaStore.setState({ stateColors: nextColors });
};

const setStateColor = (index: number, color: string): void => {
    automaStore.setState((s) => {
        const deadColor = index === 0 ? color : (s.stateColors[0] ?? '#070a14');
        const aliveColor = index === 1 ? color : (s.stateColors[1] ?? '#d97706');

        const engine = getSimulationEngine();
        const ruleId = engine.getSnapshot().ruleId;
        const rule = rules[ruleId];

        const nextColors = computeDerivedColors(rule.stateCount, deadColor, aliveColor);
        return { stateColors: nextColors };
    });
};

export {
    automaStore,
    setPaletteBrush,
    setRule,
    setStateColor,
    setToolMode,
    useBrushMode,
    usePaletteBrush,
    useStateColors
};
