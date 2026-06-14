import { graphDataStore } from './store';

export const useNodes = () => graphDataStore((s) => s.nodes);

export const useLinks = () => graphDataStore((s) => s.links);

export const useCommunities = () => graphDataStore((s) => s.communities);
