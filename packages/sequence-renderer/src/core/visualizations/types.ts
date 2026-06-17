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

export type DrawFn = (context: DrawingContext) => void;

export type LayerDefinition<TOptions extends Record<string, unknown>> = {
  with(overrides?: Partial<TOptions>): DrawFn;
};

export type ParamDescriptor =
  | { label: string; type: 'number'; min: number; max: number; step: number }
  | { label: string; type: 'color' };

export type LayerMeta<TOptions extends Record<string, unknown>> = {
  id: string;
  name: string;
  description: string;
  definition: LayerDefinition<TOptions>;
  defaultParams: TOptions;
  params: Record<keyof TOptions, ParamDescriptor>;
  preferredScale?: ScaleDefinition<Record<string, unknown>>;
};

// ─── Scale ──────────────────────────────────────────────────────────────────

export type ScaleCalculator = (params: {
  sequence: number[];
  containerSize: { width: number; height: number };
}) => number;

export type ScaleDefinition<TOptions extends Record<string, unknown>> = {
  with(overrides?: Partial<TOptions>): ScaleCalculator;
};

export type ScaleMeta<TOptions extends Record<string, unknown>> = {
  id: string;
  name: string;
  description: string;
  definition: ScaleDefinition<TOptions>;
  defaultParams: TOptions;
  params: Record<keyof TOptions, ParamDescriptor>;
};

// ─── Composition (store shape) ──────────────────────────────────────────────

export type LayerConfigEntry = {
  layerId: string;
  enabled: boolean;
  params: Record<string, unknown>;
};

export type ScaleConfigEntry = {
  id: string;
  params: Record<string, unknown>;
  autoDetected: boolean;
};

export type PresetRecord = {
  id: string;
  name: string;
  layers: LayerConfigEntry[];
  scale: { id: string; params: Record<string, unknown> };
  isBuiltIn: boolean;
};

// ─── Visualization ──────────────────────────────────────────────────────────

export type SequenceMeta = {
  hasIntervals: boolean;
};

export type VisualizationConfig = {
  id: string;
  name: string;
  layers: DrawFn[];
  calculateScale?: ScaleCalculator;
  compatibleWith?: (meta: SequenceMeta) => boolean;
};

export type Visualization = {
  id: string;
  name: string;
  compatibleWith?: (meta: SequenceMeta) => boolean;
  draw: (params: { canvas: HTMLCanvasElement; sequence: number[] }) => void;
};
