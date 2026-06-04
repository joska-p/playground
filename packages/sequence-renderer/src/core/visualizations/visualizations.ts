import { recamanArcs } from './recamanArcs';

export type Visualization = {
  id: string;
  name: string;
  draw: (options: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};

export const visualizations: Visualization[] = [recamanArcs];
