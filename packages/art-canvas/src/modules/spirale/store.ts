import { createStore, useStore } from 'zustand';

import type { ClockStore } from '@repo/glaze/react/clockStore';

type StoreState = {
    gap: number;
    clockStore: ClockStore | null;
};

const store = createStore<StoreState>(() => ({
    gap: 0.05,
    clockStore: null
}));

export const useGap = () => useStore(store, (s) => s.gap);
export const setGap = (gap: number) => {
    store.setState({ gap });
};

export const useClockStore = () => useStore(store, (s) => s.clockStore);
export const setClockStore = (clockStore: ClockStore) => {
    store.setState({ clockStore });
};
