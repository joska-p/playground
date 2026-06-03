import { create } from "zustand";
import { manipulationsIds } from "../core/manipulations/manipulations";

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

const pipelineStore = create<ManipulatorState>(() => ({
  imageFile: null,
  manipulationId: manipulationsIds[0] ?? "brightness",
  outputs: [],
}));

export function usePipelineImageFile(): string | null {
  return pipelineStore((s) => s.imageFile);
}

export function usePipelineManipulationId(): string {
  return pipelineStore((s) => s.manipulationId);
}

export function usePipelineOutputs(): OutputType[] {
  return pipelineStore((s) => s.outputs);
}

export function setPipelineImageFile(imageFile: string) {
  pipelineStore.setState({ imageFile });
}

export function setPipelineManipulationId(manipulationId: string) {
  pipelineStore.setState({ manipulationId });
}

export function setPipelineOutputs(outputs: OutputType[]) {
  pipelineStore.setState({ outputs });
}

export function addToPipelineOutputs(output: OutputType) {
  const outputs = pipelineStore.getState().outputs;
  pipelineStore.setState({
    outputs: [...outputs, output],
  });
}

export function clearPipelineOutputs() {
  const outputs = pipelineStore.getState().outputs;
  pipelineStore.setState({
    outputs: [outputs[0]],
  });
}

export function setPipelineResults(results: OutputType[]) {
  const outputs = pipelineStore.getState().outputs;
  const source = outputs[0];
  pipelineStore.setState({
    outputs: source ? [source, ...results] : results,
  });
}
