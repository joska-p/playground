import { createNullClockStore } from '@repo/glaze/react/clockStore';
import { createStore, useStore } from 'zustand';
import type { ClockStore } from '@repo/glaze/react/types';

interface StoreState {
    gap: number;
    clockStore: ClockStore;
}

const nullClockStore = createNullClockStore();

const store = createStore<StoreState>(() => ({
    gap: 0.05,
    clockStore: nullClockStore
}));

export const useGap = () => useStore(store, (s) => s.gap);
export const setGap = (gap: number) => {
    store.setState({ gap });
};

export const useClockStore = () => useStore(store, (s) => s.clockStore);
export const setClockStore = (clockStore: ClockStore) => {
    store.setState({ clockStore });
};
export const useHasClockStore = () => useStore(store, (s) => s.clockStore !== nullClockStore);
