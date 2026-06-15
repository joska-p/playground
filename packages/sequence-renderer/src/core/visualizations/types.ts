export type Visualization = {
  id: string;
  name: string;
  draw: (options: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};
