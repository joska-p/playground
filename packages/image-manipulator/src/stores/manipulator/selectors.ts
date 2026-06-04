import { manipulatorStore } from './store';
import type { OutputType, WorkflowStep } from './types';

function useImageSource(): OutputType | undefined {
  return manipulatorStore((s) => s.imageSource);
}

function useOutputs(): OutputType[] {
  return manipulatorStore((s) => s.outputs);
}

function useIsProcessing(): boolean {
  return manipulatorStore((s) => s.isProcessing);
}

function useWorkflowSteps(): WorkflowStep[] {
  return manipulatorStore((s) => s.workflow);
}

export { useImageSource, useIsProcessing, useOutputs, useWorkflowSteps };
