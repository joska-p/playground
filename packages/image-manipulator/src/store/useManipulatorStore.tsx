import { create } from "zustand";
import { manipulations } from "../manipulations";

export type ManipulationId = (typeof manipulations)[number]["id"];

type ManipulatorState = {
  currentManipulationId: ManipulationId;
  pipe: ManipulationId[];
};

const useManipulatorStore = create<ManipulatorState>()(() => ({
  currentManipulationId: manipulations[0].id,
  pipe: [],
}));

function setManipulationId(manipulationId: ManipulationId) {
  useManipulatorStore.setState({
    currentManipulationId: manipulationId,
  });
}

function setPipe(pipe: ManipulationId[]) {
  useManipulatorStore.setState({
    pipe,
  });
}

function addToPipe(pipe: ManipulationId[]) {
  useManipulatorStore.setState((state) => ({
    pipe: [...state.pipe, ...pipe],
  }));
}

function clearPipe() {
  useManipulatorStore.setState({
    pipe: [],
  });
}

export { useManipulatorStore, setManipulationId, setPipe, addToPipe, clearPipe };
