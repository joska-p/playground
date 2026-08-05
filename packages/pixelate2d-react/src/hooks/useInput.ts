import { type Engine, type InputStore, type RenderDriver } from '@repo/pixelate2d-core';
import { getEngine } from '../utils/engine-registry';

/**
 * Access the shared input poll store for a driver or engine. The store is
 * mutated outside React, so reading it in a render callback never triggers a
 * re-render.
 */
export function useInput(target: Engine | RenderDriver | null): InputStore | null {
        if (!target) return null;
        return getEngine(target)?.input ?? null;
}
