import { create } from "zustand";
import { manipulationsIds } from "../core/manipulations/manipulations";

export type OutputType = {
  id: string;
  name: string;
  description: string;
  imageData: ImageData;
};

type ManipulatorState = {
  imageSource: OutputType | null;
  fileName: string | null;
  manipulationId: string;
  outputs: OutputType[];
  isProcessing: boolean;
};

const pipelineStore = create<ManipulatorState>(() => ({
  imageSource: null,
  fileName: null,
  manipulationId: manipulationsIds[0] ?? "brightness",
  outputs: [],
  isProcessing: false,
}));

export function usePipelineImageSource(): OutputType | null {
  return pipelineStore((s) => s.imageSource);
}

export function usePipelineFileName(): string | null {
  return pipelineStore((s) => s.fileName);
}

export function setPipelineImageSource(imageSource: OutputType | null) {
  pipelineStore.setState({ imageSource });
}

export function setPipelineFileName(fileName: string | null) {
  pipelineStore.setState({ fileName });
}

export function clearPipelineSource() {
  pipelineStore.setState({ imageSource: null, fileName: null });
}

export function usePipelineManipulationId(): string {
  return pipelineStore((s) => s.manipulationId);
}

export function setPipelineManipulationId(manipulationId: string) {
  pipelineStore.setState({ manipulationId });
}

export function usePipelineOutputs(): OutputType[] {
  return pipelineStore((s) => s.outputs);
}

export function setPipelineOutputs(outputs: OutputType[]) {
  pipelineStore.setState({ outputs });
}

export function clearPipelineOutputs() {
  pipelineStore.setState({ outputs: [] });
}

export function useIsProcessing(): boolean {
  return pipelineStore((s) => s.isProcessing);
}

export function setProcessing(isProcessing: boolean) {
  pipelineStore.setState({ isProcessing });
}
