import { create } from 'zustand';
import type { OutputType, WorkflowStep } from './types';

type ManipulatorState = {
  imageSource?: OutputType;
  outputs: OutputType[];
  isProcessing: boolean;
  workflow: WorkflowStep[];
};

const manipulatorStore = create<ManipulatorState>(() => ({
  outputs: [],
  isProcessing: false,
  workflow: [],
}));

export { manipulatorStore };
