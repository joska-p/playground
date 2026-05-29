import { create } from "zustand";
import type { ManipulationId } from "../manipulations/manipulations";
import { manipulationsIds } from "../manipulations/manipulations";

export type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type ManipulatorState = {
  imageFile: string | null;
  manipulationId: ManipulationId;
  outputs: OutputType[];
};

const manipulatorStore = create<ManipulatorState>(() => ({
  imageFile: null,
  manipulationId: manipulationsIds[0],
  outputs: [],
}));

export function useManipulatorImageFile(): string | null {
  return manipulatorStore((s) => s.imageFile);
}

export function useManipulatorManipulationId(): ManipulationId {
  return manipulatorStore((s) => s.manipulationId);
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
