import { createStore, useStore } from 'zustand';
import { createClock, type Clock } from '@repo/glaze/core/Clock';
import type { ClockStore } from '@repo/glaze/react/clockStore';

type StoreState = {
    clock: Clock;
    gap: number;
    clockStore: ClockStore | null;
};

const clock = createClock();

const store = createStore<StoreState>(() => ({
    clock,
    gap: 0.05,
    clockStore: null
}));

export const useClock = () => useStore(store, (s) => s.clock);
export const useGap = () => useStore(store, (s) => s.gap);
export const setGap = (gap: number) => {
    store.setState({ gap });
};

export const useClockStore = () => useStore(store, (s) => s.clockStore);
export const setClockStore = (clockStore: ClockStore) => {
    store.setState({ clockStore });
};
