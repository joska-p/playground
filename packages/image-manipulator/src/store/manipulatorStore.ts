import { create } from "zustand";
import { manipulationsIds } from "../manipulations/manipulations";

export type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type ManipulatorState = {
  imageFile: string | null;
  manipulationId: string;
  outputs: OutputType[];
};

const manipulatorStore = create<ManipulatorState>(() => ({
  imageFile: null,
  manipulationId: manipulationsIds[0] ?? "brightness",
  outputs: [],
}));

export function useManipulatorImageFile(): string | null {
  return manipulatorStore((s) => s.imageFile);
}

export function useManipulatorManipulationId(): string {
  return manipulatorStore((s) => s.manipulationId);
}

export function useManipulatorOutputs(): OutputType[] {
  return manipulatorStore((s) => s.outputs);
}

export function setManipulatorImageFile(imageFile: string) {
  manipulatorStore.setState({ imageFile });
}

export function setManipulatorManipulationId(manipulationId: string) {
  manipulatorStore.setState({ manipulationId });
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

export function setPipelineResults(results: OutputType[]) {
  const outputs = manipulatorStore.getState().outputs;
  const source = outputs[0];
  manipulatorStore.setState({
    outputs: source ? [source, ...results] : results,
  });
}
