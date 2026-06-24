import { getStartedStore } from './store';

export const setLeafMaxSpread = (leafMaxSpread: number) =>
  getStartedStore.setState({ leafMaxSpread });
export const setLeafAmount = (leafAmount: number) =>
  getStartedStore.setState({ leafAmount });
export const setBrancheOffsetFromCenter = (brancheOffsetFromCenter: number) =>
  getStartedStore.setState({ brancheOffsetFromCenter });
export const setBranchAmount = (branchAmount: number) =>
  getStartedStore.setState({ branchAmount });
