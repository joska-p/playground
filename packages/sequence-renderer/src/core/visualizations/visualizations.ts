import { recamanArcs } from "./recamanArcs";

export type Visualization = {
  id: string;
  name: string;
  draw: (canvas: HTMLCanvasElement, sequence: number[]) => void;
};

export const visualizations: Visualization[] = [recamanArcs];
