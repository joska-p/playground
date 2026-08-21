import { doubleSplitStore } from './doubleSplitStore';
import { originalStore } from './originalStore';
import { perturbationStore } from './perturbationStore';

import type { RendererParams } from './createParamStore';
import type { Renderer } from './viewStore';
import type { StoreApi } from 'zustand';

export const paramStores: Record<Renderer, StoreApi<RendererParams>> = {
    'double-single': doubleSplitStore,
    perturbation: perturbationStore,
    original: originalStore
};
