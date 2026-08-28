import { useStore, type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

export interface RendererParams {
    iterationBase: number;
    iterationScale: number;
    iterationCap: number;
    interiorScale: number;
    pixelEps: number;
    sunAngle: number;
    bumpHeight: number;
    ambientLight: number;
    hueShift: number;
    hueFrequency: number;
    chromaScale: number;
}

export const DEFAULT_PARAMS: RendererParams = {
    iterationBase: 70,
    iterationScale: 30,
    iterationCap: 1200,
    interiorScale: 9.0,
    pixelEps: 0.0025,
    sunAngle: 2.35,
    bumpHeight: 15.0,
    ambientLight: 0.2,
    hueShift: 0.0,
    hueFrequency: 0.1,
    chromaScale: 0.05
};

export type ParamKey = keyof RendererParams;

export function createParamStore(initial: RendererParams): StoreApi<RendererParams> {
    return createStore<RendererParams>(() => ({ ...initial }));
}

export function useParams(store: StoreApi<RendererParams>): RendererParams {
    return useStore(store);
}

export function setParam(store: StoreApi<RendererParams>, key: ParamKey, value: number): void {
    store.setState({ [key]: value } as Partial<RendererParams>);
}

export function resetParams(store: StoreApi<RendererParams>): void {
    store.setState({ ...DEFAULT_PARAMS });
}
