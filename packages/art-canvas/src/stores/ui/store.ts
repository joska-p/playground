import { createStore, useStore } from 'zustand';

export type InputMode = 'spirale' | 'seed' | 'folded-space' | 'atlas' | 'manual';

interface UiStoreState {
    inputMode: InputMode;
}

const uiStore = createStore<UiStoreState>(() => ({
    inputMode: 'spirale'
}));

export const useInputMode = () => {
    const inputMode = useStore(uiStore, (state) => state.inputMode);

    return inputMode;
};

export const setInpuMode = (inputMode: InputMode) => {
    uiStore.setState({ inputMode });
};
