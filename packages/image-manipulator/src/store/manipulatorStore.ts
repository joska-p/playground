import { create } from "zustand";
import { manipulationsIds } from "../manipulations/manipulations";

export type ManipulationId = (typeof manipulationsIds)[number];
export type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type ManipulatorState = {
  imageFile: string | null;
  manipulationId: ManipulationId;
  workflow: ManipulationId[];
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

export function useManipulatorWorkflow(): ManipulationId[] {
  return manipulatorStore((s) => s.workflow);
}

export function useManipulatorOutputs(): OutputType[] {
  return manipulatorStore((s) => s.outputs);
}

export function setManipulatorImageFile(imageFile: string) {
  manipulatorStore.setState({ imageFile });
}

export function setManipulatorManipulationId(manipulationId: ManipulationId) {
  manipulatorStore.setState({
    manipulationId,
  });
}

export function addToManipulatorWorkflow(newManipulation: ManipulationId) {
  const workflow = manipulatorStore.getState().workflow;
  manipulatorStore.setState({
    workflow: [...workflow, newManipulation],
  });
}

export function clearManipulatorWorkflow() {
  manipulatorStore.setState({
    workflow: [],
  });
}

export function addToManipulatorOutputs(output: OutputType) {
  const outputs = manipulatorStore.getState().outputs;
  manipulatorStore.setState({
    outputs: [...outputs, output],
  });
}

export function clearManipulatorOutputs() {
  manipulatorStore.setState({
    outputs: [],
  });
}
