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

export type ScaleCalculator = (options: {
  sequence: number[];
  containerSize: { width: number; height: number };
}) => number;

export type LayerFactory<
  TOptions extends Record<string, unknown> = Record<string, unknown>
> = (options?: Partial<TOptions>) => VisualizationLayer;

export type LayerEntry = {
  id: string;
  name: string;
  layer: LayerFactory;
  scaleCalculator?: ScaleCalculator;
  compatibleWith?: (seqMeta: { hasIntervals: boolean }) => boolean;
};

export type Visualization = {
  id: string;
  name: string;
  draw: (options: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};

export type VisualizationConfig = {
  id: string;
  name: string;
  layers: LayerFactory[];
  calculateScale?: ScaleCalculator;
};
