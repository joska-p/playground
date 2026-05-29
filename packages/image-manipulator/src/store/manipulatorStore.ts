import { create } from "zustand";
import { manipulations, manipulationsIds } from "../manipulations/manipulations";

export type ManipulationId = (typeof manipulationsIds)[number];

export type WorkflowStep = {
  id: ManipulationId;
  args: Record<string, number>;
};

export type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type ManipulatorState = {
  imageFile: string | null;
  manipulationId: ManipulationId;
  workflow: WorkflowStep[];
  outputs: OutputType[];
};

const manipulatorStore = create<ManipulatorState>(() => ({
  imageFile: null,
  manipulationId: manipulationsIds[0],
  workflow: [],
  outputs: [],
}));

export function useManipulatorImageFile(): string | null {
  return manipulatorStore((s) => s.imageFile);
}

export function useManipulatorManipulationId(): ManipulationId {
  return manipulatorStore((s) => s.manipulationId);
}

export function useManipulatorWorkflow(): WorkflowStep[] {
  return manipulatorStore((s) => s.workflow);
}

export function useManipulatorOutputs(): OutputType[] {
  return manipulatorStore((s) => s.outputs);
}

export function setManipulatorImageFile(imageFile: string) {
  manipulatorStore.setState({ imageFile });
}

export function setManipulatorManipulationId(manipulationId: ManipulationId) {
  manipulatorStore.setState({ manipulationId });
}

export function addToManipulatorWorkflow(id: ManipulationId) {
  const workflow = manipulatorStore.getState().workflow;
  manipulatorStore.setState({
    workflow: [...workflow, { id, args: { ...manipulations[id].defaultArgs } }],
  });
}

export function updateManipulatorWorkflowStepArgs(
  index: number,
  args: Record<string, number>,
) {
  const workflow = manipulatorStore.getState().workflow;
  const updated = workflow.map((step, i) => (i === index ? { ...step, args } : step));
  manipulatorStore.setState({ workflow: updated });
}

export function clearManipulatorWorkflow() {
  manipulatorStore.setState({ workflow: [] });
}

export function addToManipulatorOutputs(output: OutputType) {
  const outputs = manipulatorStore.getState().outputs;
  manipulatorStore.setState({
    outputs: [...outputs, output],
  });
}

export function clearManipulatorOutputs() {
  const outputs = manipulatorStore.getState().outputs;
  const originalOutput = outputs[0];

  manipulatorStore.setState({
    outputs: [originalOutput],
  });
}
