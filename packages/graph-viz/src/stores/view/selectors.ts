import { graphStore } from './store';

export const useSelectedNodeIdx = () => graphStore((s) => s.selectedNodeIdx);

export const useEdgesVisible = () => graphStore((s) => s.edgesVisible);

export const useVisibleCommunities = () =>
  graphStore((s) => s.visibleCommunities);

export const useLabelsVisible = () => graphStore((s) => s.labelsVisible);
