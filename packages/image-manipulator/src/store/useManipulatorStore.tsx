import { create } from "zustand";
import { manipulations } from "../manipulations";

export type ManipulationId = (typeof manipulations)[number]["id"];

type ManipulatorState = {
  imageFile: string | null;
  manipulationId: ManipulationId;
  workflow: ManipulationId[];
};

const useManipulatorStore = create<ManipulatorState>()(() => ({
  imageFile: null,
  manipulationId: manipulations[0].id,
  workflow: [],
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
  const { workflow } = useManipulatorStore.getState();
  useManipulatorStore.setState({
    workflow: [...workflow, newManipulation],
  });
}

function clearWorkflow() {
  useManipulatorStore.setState({
    workflow: [],
  });
}

export { useManipulatorStore, setImageFile, setManipulationId, addToWorkflow, clearWorkflow };
