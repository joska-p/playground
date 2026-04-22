import { create } from "zustand";
import type { SequenceRule } from "../core/rules.js";
import { recamanRule } from "../core/rules.js";
import { generateSequence } from "../core/generator.js";

interface SequenceState {
  sequenceRule: SequenceRule;
  steps: number;
  drawMode: "vector-mode" | "canvas-mode";
  sequence: number[];
}

export const useSequenceStore = create<SequenceState>()(() => ({
  sequenceRule: recamanRule,
  steps: 2,
  drawMode: "canvas-mode",
  sequence: [0, 1],
}));

export const setSequenceRule = (rule: SequenceRule) => {
  useSequenceStore.setState({ sequenceRule: rule });
  setSequence(generateSequence(rule, useSequenceStore.getState().steps));
};
export const setSteps = (steps: number) => {
  useSequenceStore.setState({ steps });
  setSequence(
    generateSequence(useSequenceStore.getState().sequenceRule, useSequenceStore.getState().steps)
  );
};
export const setDrawMode = (mode: "vector-mode" | "canvas-mode") => {
  useSequenceStore.setState({ drawMode: mode });
};
export const setSequence = (sequence: number[]) => {
  useSequenceStore.setState({ sequence });
};
