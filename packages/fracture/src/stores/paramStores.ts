import type { StoreApi } from 'zustand';
import type { RendererParams } from './createParamStore';
import type { Renderer } from './viewStore';
import { originalStore } from './originalStore';
import { doubleSplitStore } from './doubleSplitStore';
import { perturbationStore } from './perturbationStore';

export const paramStores: Record<Renderer, StoreApi<RendererParams>> = {
    'double-single': doubleSplitStore,
    perturbation: perturbationStore,
    original: originalStore
};
