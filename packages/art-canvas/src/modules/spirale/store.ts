import { createStore, useStore } from 'zustand';
import type { Clock } from '@repo/glaze/core/Clock';
import { createClock } from '@repo/glaze/core/Clock';

export type StoreState = {
    clock: Clock;
    gap: number;
};

const newClock = createClock();

const store = createStore<StoreState>(() => ({
    clock: newClock,
    gap: 0.05
}));

export const useClock = () => {
    const clock = useStore(store, (state) => state.clock);
    return clock;
};

export const useGap = () => {
    const gap = useStore(store, (state) => state.gap);
    return gap;
};

export const setGap = (gap: number) => {
    store.setState({ gap });
};
