export type Visualization = {
  id: string;
  name: string;
  draw: (options: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};

export type ScaleCalculator = (options: {
  sequence: number[];
  containerSize: { width: number; height: number };
}) => number;

export type DrawingContext = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sequence: number[];
  containerSize: { width: number; height: number };
  maxVal: number;
  valueScale: number;
  offsetX: number;
  offsetY: number;
  textColor: string;
};

export type VisualizationLayer = (context: DrawingContext) => void;
