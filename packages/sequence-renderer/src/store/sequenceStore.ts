import { create } from 'zustand';
import { generateSequence, recamanRule } from '../core/sequence-rules';
import type { SequenceRule } from '../core/sequence-rules';
import { visualizations } from '../core/visualizations/visualizations';

type SequenceState = {
  sequenceRule: SequenceRule;
  steps: number;
  visualizationId: string;
  sequence: number[];
};

function generateInitial({
  sequenceRule,
  steps,
}: {
  sequenceRule: SequenceRule;
  steps: number;
}): number[] {
  return generateSequence({ sequenceRule, steps });
}

function clampSteps({
  steps,
  maxSteps,
}: {
  steps: number;
  maxSteps: number;
}): number {
  return Math.min(Math.max(steps, 2), maxSteps);
}

const sequenceStore = create<SequenceState>(() => ({
  sequenceRule: recamanRule,
  steps: 2,
  visualizationId: visualizations[0]?.id ?? 'recaman-arcs',
  sequence: generateInitial({ sequenceRule: recamanRule, steps: 2 }),
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

export function setSequenceRule({
  sequenceRule,
}: {
  sequenceRule: SequenceRule;
}): void {
  const currentSteps = sequenceStore.getState().steps;
  const clampedSteps = clampSteps({
    steps: currentSteps,
    maxSteps: sequenceRule.maxSteps,
  });
  sequenceStore.setState({
    sequenceRule,
    steps: clampedSteps,
    sequence: generateSequence({ sequenceRule, steps: clampedSteps }),
  });
}

export function setSequenceSteps({ steps }: { steps: number }): void {
  const state = sequenceStore.getState();
  const clampedSteps = clampSteps({
    steps,
    maxSteps: state.sequenceRule.maxSteps,
  });
  sequenceStore.setState({
    steps: clampedSteps,
    sequence: generateSequence({
      sequenceRule: state.sequenceRule,
      steps: clampedSteps,
    }),
  });
}

export function setSequenceVisualizationId({
  visualizationId,
}: {
  visualizationId: string;
}): void {
  sequenceStore.setState({ visualizationId });
}
