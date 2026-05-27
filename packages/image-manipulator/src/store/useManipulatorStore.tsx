import { create } from "zustand";
import { manipulationsIds } from "../manipulations";

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

const useManipulatorStore = create<ManipulatorState>()(() => ({
  imageFile: null,
  manipulationId: manipulationsIds[0],
  workflow: [],
  outputs: [],
}));

function setImageFile(imageFile: string) {
  useManipulatorStore.setState({ imageFile });
}

function setManipulationId(manipulationId: ManipulationId) {
  useManipulatorStore.setState({
    manipulationId,
  });
}

function addToWorkflow(newManipulation: ManipulationId) {
  const workflow = useManipulatorStore.getState().workflow;
  useManipulatorStore.setState({
    workflow: [...workflow, newManipulation],
  });
}

function clearWorkflow() {
  useManipulatorStore.setState({
    workflow: [],
  });
}

function addToOutputs(output: OutputType) {
  const outputs = useManipulatorStore.getState().outputs;
  useManipulatorStore.setState({
    outputs: [...outputs, output],
  });
}

function clearOutputs() {
  useManipulatorStore.setState({
    outputs: [],
  });
}

export {
  addToOutputs,
  addToWorkflow,
  clearOutputs,
  clearWorkflow,
  setImageFile,
  setManipulationId,
  useManipulatorStore,
};
