import { create } from "zustand";
import { generateSequence } from "../core/generateSequence";
import type { SequenceRule } from "../core/sequencesRule";
import { recamanRule } from "../core/sequencesRule";
import { visualizations } from "../core/visualizations/visualizations";

type SequenceState = {
  sequenceRule: SequenceRule;
  steps: number;
  visualizationId: string;
  sequence: number[];
};

function generateInitial(rule: SequenceRule, steps: number) {
  return generateSequence(rule, steps);
}

const sequenceStore = create<SequenceState>(() => ({
  sequenceRule: recamanRule,
  steps: 2,
  visualizationId: visualizations[0]?.id ?? "recaman-arcs",
  sequence: generateInitial(recamanRule, 2),
}));

export function useSequenceRule(): SequenceRule {
  return sequenceStore((s) => s.sequenceRule);
}

export function useSequenceSteps(): number {
  return sequenceStore((s) => s.steps);
}

export function useSequenceVisualizationId(): string {
  return sequenceStore((s) => s.visualizationId);
}

export function useSequenceSequence(): number[] {
  return sequenceStore((s) => s.sequence);
}

export function setSequenceRule(rule: SequenceRule) {
  const currentSteps = sequenceStore.getState().steps;
  const clampedSteps = Math.min(currentSteps, rule.maxSteps);
  sequenceStore.setState({
    sequenceRule: rule,
    steps: clampedSteps,
    sequence: generateSequence(rule, clampedSteps),
  });
}

export function setSequenceSteps(steps: number) {
  const state = sequenceStore.getState();
  const max = state.sequenceRule.maxSteps;
  const clampedSteps = Math.min(Math.max(steps, 2), max);
  sequenceStore.setState({
    steps: clampedSteps,
    sequence: generateSequence(state.sequenceRule, clampedSteps),
  });
}

export function setSequenceVisualizationId(id: string) {
  sequenceStore.setState({ visualizationId: id });
}
