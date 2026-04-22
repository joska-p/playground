import { create } from "zustand";
import type { SequenceRule } from "../core/rules.js";
import { recamanRule } from "../core/rules.js";
import { generateSequence } from "../core/generator.js";
import { visualizations } from "../core/visualizations/index.js";

interface SequenceState {
  sequenceRule: SequenceRule;
  steps: number;
  visualizationId: string;
  sequence: number[];
}

function generateInitial(rule: SequenceRule, steps: number) {
  return generateSequence(rule, steps);
}

export const useSequenceStore = create<SequenceState>()(() => ({
  sequenceRule: recamanRule,
  steps: 2,
  visualizationId: visualizations[0]?.id ?? "recaman-arcs",
  sequence: generateInitial(recamanRule, 2),
}));

export const setSequenceRule = (rule: SequenceRule) => {
  const currentSteps = useSequenceStore.getState().steps;
  const clampedSteps = Math.min(currentSteps, rule.maxSteps);
  useSequenceStore.setState({
    sequenceRule: rule,
    steps: clampedSteps,
    sequence: generateSequence(rule, clampedSteps),
  });
};

export const setSteps = (steps: number) => {
  const state = useSequenceStore.getState();
  const max = state.sequenceRule.maxSteps;
  const clampedSteps = Math.min(Math.max(steps, 2), max);
  useSequenceStore.setState({
    steps: clampedSteps,
    sequence: generateSequence(state.sequenceRule, clampedSteps),
  });
};

export const setVisualizationId = (id: string) => {
  useSequenceStore.setState({ visualizationId: id });
};