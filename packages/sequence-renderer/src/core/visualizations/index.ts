import { recamanArcs } from "./recaman-arcs.js";

export interface Visualization {
  id: string;
  name: string;
  draw: (canvas: HTMLCanvasElement, sequence: number[]) => void;
}

export const visualizations: Visualization[] = [recamanArcs];
