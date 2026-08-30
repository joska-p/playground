import { create } from 'zustand';

interface Store {
    source: ImageData | null;
    output: ImageData | null;
}

const store = create<Store>(() => ({
    source: null,
    output: null
}));

export function useSource(): ImageData | null {
    return store((s) => s.source);
}

export function useOutput(): ImageData | null {
    return store((s) => s.output);
}

export function setSource(data: ImageData): void {
    store.setState({ source: data });
}

export function setOutput(data: ImageData): void {
    store.setState({ output: data });
}
