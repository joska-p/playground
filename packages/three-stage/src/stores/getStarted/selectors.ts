import { useStore } from 'zustand';
import { getStartedStore } from './store';

export const useLeafMaxSpread = () =>
  useStore(getStartedStore, (state) => state.leafMaxSpread);
export const useLeafAmount = () =>
  useStore(getStartedStore, (state) => state.leafAmount);
export const useBrancheOffsetFromCenter = () =>
  useStore(getStartedStore, (state) => state.brancheOffsetFromCenter);
export const useBranchAmount = () =>
  useStore(getStartedStore, (state) => state.branchAmount);
