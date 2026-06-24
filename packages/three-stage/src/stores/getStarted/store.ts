import { createStore } from 'zustand';
import type { PresetName } from '../../components/GetStarted/spawnPresets';

export type GetStartedStore = {
  leafMaxSpread: number;
  leafAmount: number;
  brancheOffsetFromCenter: number;
  branchAmount: number;
  spawnPresetName: PresetName;
};

function getInitialState(): GetStartedStore {
  return {
    leafMaxSpread: 10,
    leafAmount: 20,
    brancheOffsetFromCenter: 1,
    branchAmount: 4,
    spawnPresetName: 'cube'
  };
}

export const getStartedStore = createStore<GetStartedStore>(getInitialState);
