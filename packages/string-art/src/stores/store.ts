import { create } from 'zustand';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

interface Store {
    surface: CpuSurface | null;
    source: ImageData | null;
    output: ImageData | null;
}

const store = create<Store>(() => ({
    surface: null,
    source: null,
    output: null
}));

export function useSurface(): CpuSurface | null {
    return store((s) => s.surface);
}

export function useSource(): ImageData | null {
    return store((s) => s.source);
}

export function useOutput(): ImageData | null {
    return store((s) => s.output);
}

export function setSurface(surface: CpuSurface): void {
    store.setState({ surface });
}

export function setSource(data: ImageData): void {
    store.setState({ source: data });
}

export function setOutput(data: ImageData): void {
    store.setState({ output: data });
}
