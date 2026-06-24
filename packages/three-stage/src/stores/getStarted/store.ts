import { createStore } from 'zustand';

export type GetStartedStore = {
  leafMaxSpread: number;
  leafAmount: number;
  brancheOffsetFromCenter: number;
  branchAmount: number;
};

function getInitialState(): GetStartedStore {
  return {
    leafMaxSpread: 10,
    leafAmount: 20,
    brancheOffsetFromCenter: 1,
    branchAmount: 4
  };
}

export const getStartedStore = createStore<GetStartedStore>(getInitialState);
