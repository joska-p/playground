import { createStore, useStore } from 'zustand';

export type StoreState = {
    isPlaying: boolean;
};

const store = createStore<StoreState>(() => ({
    isPlaying: false
}));

export const useIsPlaying = () => {
    const isPlaying = useStore(store, (state) => state.isPlaying);
    return isPlaying;
};

export const setIsPlaying = (isPlaying: boolean) => {
    store.setState({ isPlaying });
};
