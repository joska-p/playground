// ─── Drawing ────────────────────────────────────────────────────────────────

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

// ─── Layer ──────────────────────────────────────────────────────────────────

// The raw draw function, ready to be called on a context
export type DrawFn = (context: DrawingContext) => void;

// What defineLayer() returns — a builder with a .with() configurator
export type LayerDefinition<TOptions extends Record<string, unknown>> = {
  with(overrides?: Partial<TOptions>): DrawFn;
};

// ─── Visualization ──────────────────────────────────────────────────────────

export type SequenceMeta = {
  hasIntervals: boolean;
};

export type ScaleCalculator = (params: {
  sequence: number[];
  containerSize: { width: number; height: number };
}) => number;

export type VisualizationConfig = {
  id: string;
  name: string;
  layers: DrawFn[]; // already resolved via .with()
  calculateScale?: ScaleCalculator;
  compatibleWith?: (meta: SequenceMeta) => boolean;
};

export type Visualization = {
  id: string;
  name: string;
  compatibleWith?: (meta: SequenceMeta) => boolean;
  draw: (params: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};
