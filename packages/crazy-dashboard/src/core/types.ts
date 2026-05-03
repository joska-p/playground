import { z } from "zod";

// --- Rule Context ---

export const CpuRuleContextSchema = z.object({
  current: z.number(),
  timestamp: z.number(),
});

export type CpuRuleContext = z.infer<typeof CpuRuleContextSchema>;

export const MemoryRuleContextSchema = z.object({
  current: z.number(),
  timestamp: z.number(),
  performanceMemory: z
    .object({
      usedJSHeapSize: z.number(),
      jsHeapSizeLimit: z.number(),
    })
    .optional(),
});

export type MemoryRuleContext = z.infer<typeof MemoryRuleContextSchema>;

export const NetworkRuleContextSchema = z.object({
  current: z.number(),
  timestamp: z.number(),
  navigatorConnection: z
    .object({
      downlink: z.number(),
      rtt: z.number(),
    })
    .optional(),
});

export type NetworkRuleContext = z.infer<typeof NetworkRuleContextSchema>;

export const WalkerRuleContextSchema = z.object({
  current: z.object({ x: z.number(), y: z.number() }),
  timestamp: z.number(),
  bounds: z.object({ width: z.number(), height: z.number() }),
});

export type WalkerRuleContext = z.infer<typeof WalkerRuleContextSchema>;

export const CursorRuleContextSchema = z.object({
  current: z.object({ x: z.number(), y: z.number() }),
  timestamp: z.number(),
  bounds: z.object({ width: z.number(), height: z.number() }),
});

export type CursorRuleContext = z.infer<typeof CursorRuleContextSchema>;

// --- Rules ---

export const CpuRuleSchema = z.object({
  id: z.string(),
  name: z.string(),

  getNext: z.custom<(context: CpuRuleContext) => number>((fn) => typeof fn === "function"),
});

export type CpuRule = z.infer<typeof CpuRuleSchema>;

export const MemoryRuleSchema = z.object({
  id: z.string(),
  name: z.string(),

  getNext: z.custom<(context: MemoryRuleContext) => number>((fn) => typeof fn === "function"),
});

export type MemoryRule = z.infer<typeof MemoryRuleSchema>;

export const NetworkRuleSchema = z.object({
  id: z.string(),
  name: z.string(),

  getNext: z.custom<(context: NetworkRuleContext) => number>((fn) => typeof fn === "function"),
});

export type NetworkRule = z.infer<typeof NetworkRuleSchema>;

export const WalkerRuleSchema = z.object({
  id: z.string(),
  name: z.string(),

  getNext: z.custom<(context: WalkerRuleContext) => { x: number; y: number }>(
    (fn) => typeof fn === "function"
  ),
});

export type WalkerRule = z.infer<typeof WalkerRuleSchema>;

export const CursorRuleSchema = z.object({
  id: z.string(),
  name: z.string(),

  getNext: z.custom<(context: CursorRuleContext) => { x: number; y: number }>(
    (fn) => typeof fn === "function"
  ),
});

export type CursorRule = z.infer<typeof CursorRuleSchema>;

// --- Generator (takes a rule, returns next value) ---

export const GeneratorSchema = z.object({
  id: z.string(),
  name: z.string(),
  rule: z.union([
    CpuRuleSchema,
    MemoryRuleSchema,
    NetworkRuleSchema,
    WalkerRuleSchema,
    CursorRuleSchema,
  ]),

  generate: z.custom<(rule?: unknown, ...args: unknown[]) => number | { x: number; y: number }>(
    (fn) => typeof fn === "function"
  ),
});

export type Generator = z.infer<typeof GeneratorSchema>;

// --- Metric State ---

export const NumberMetricStateSchema = z.object({
  current: z.number(),
  history: z.array(z.number()),
});

export type NumberMetricState = z.infer<typeof NumberMetricStateSchema>;

export const PointMetricStateSchema = z.object({
  current: z.object({ x: z.number(), y: z.number() }),
  history: z.array(z.object({ x: z.number(), y: z.number() })),
});

export type PointMetricState = z.infer<typeof PointMetricStateSchema>;

export type MetricState = NumberMetricState | PointMetricState;

export const MetricStateSchema = z.union([NumberMetricStateSchema, PointMetricStateSchema]);

export interface MetricStates {
  cpu: NumberMetricState;
  memory: NumberMetricState;
  network: NumberMetricState;
  walker: PointMetricState;
  cursor: PointMetricState;
}

// --- Visualization ---

export const VisualizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  component: z.custom<React.ComponentType>((val) => typeof val === "function"),
});

export type Visualization = z.infer<typeof VisualizationSchema>;

// --- Dashboard Store ---

export const DashboardStoreSchema = z.object({
  metrics: z.object({
    cpu: NumberMetricStateSchema,
    memory: NumberMetricStateSchema,
    network: NumberMetricStateSchema,
    walker: PointMetricStateSchema,
    cursor: PointMetricStateSchema,
  }),
  mode: z.enum(["standard", "creative"]),
  theme: z.string(),
  paused: z.boolean(),
});

export type DashboardStore = z.infer<typeof DashboardStoreSchema>;
