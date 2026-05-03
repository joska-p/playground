import { CpuLineChart } from "./cpu-line-chart.js";
import { MemoryRingGauge } from "./memory-ring-gauge.js";
import { NetworkAreaChart } from "./network-area-chart.js";
import { WalkerScatter } from "./walker-scatter.js";
import { CursorTrail } from "./cursor-trail.js";
import type { Visualization } from "../../types.js";

export const standardVisualizations: Visualization[] = [
  { id: "cpu-line", name: "CPU Line Chart", component: CpuLineChart },
  { id: "memory-ring", name: "Memory Ring Gauge", component: MemoryRingGauge },
  { id: "network-area", name: "Network Area Chart", component: NetworkAreaChart },
  { id: "walker-scatter", name: "Walker Scatter", component: WalkerScatter },
  { id: "cursor-trail", name: "Cursor Trail", component: CursorTrail },
];
