import type { Engine, RenderDriver } from '@repo/pixelate2d-core';

const engines = new WeakMap<RenderDriver, Engine>();

export function registerEngine(driver: RenderDriver, engine: Engine): void {
  engines.set(driver, engine);
}

/**
 * Resolve the engine behind either an `Engine` or a `RenderDriver` created by
 * the React layer. Lets hooks like `useFrame` accept the driver directly.
 */
export function getEngine(target: Engine | RenderDriver): Engine | undefined {
  if ('kind' in target) return engines.get(target);
  return target;
}
