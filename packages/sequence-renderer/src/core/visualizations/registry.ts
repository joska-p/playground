import { recamanArcs } from './recamanArcs';
import type { Visualization } from './types';

const visualizations = new Map<string, Visualization>([
  [recamanArcs.id, recamanArcs]
]);

export function getVisualization(id: string): Visualization | undefined {
  return visualizations.get(id);
}

export function getAllVisualizations(): Visualization[] {
  return Array.from(visualizations.values());
}
