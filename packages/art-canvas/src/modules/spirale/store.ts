import { createStore, useStore } from 'zustand';

export type StoreState = {
    isPlaying: boolean;
    gap: number;
};

const store = createStore<StoreState>(() => ({
    isPlaying: false,
    gap: 0.05
}));

export const useIsPlaying = () => {
    const isPlaying = useStore(store, (state) => state.isPlaying);
    return isPlaying;
};

export const setIsPlaying = (isPlaying: boolean) => {
    store.setState({ isPlaying });
};

export const toggleIsPlaying = () => {
    store.setState({ isPlaying: !store.getState().isPlaying });
};

export const useGap = () => {
    const gap = useStore(store, (state) => state.gap);
    return gap;
};

export const setGap = (gap: number) => {
    store.setState({ gap });
};
