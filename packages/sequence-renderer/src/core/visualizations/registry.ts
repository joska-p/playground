import { frontWave } from './presets/frontWave';
import { recamanWalk } from './presets/recamanWalk';
import type { Visualization } from './types';

const visualizationRegistry = new Map<string, Visualization>([
  [frontWave.id, frontWave],
  [recamanWalk.id, recamanWalk]
]);

function getVisualization(id: string): Visualization | undefined {
  return visualizationRegistry.get(id);
}

function getAllVisualizations(): Visualization[] {
  return Array.from(visualizationRegistry.values());
}

export { getAllVisualizations, getVisualization };
