import { create } from "zustand";
import type { DashboardStore } from "../core/types.js";
import { generators } from "../core/generators/index.js";
import type { MetricStates } from "../core/types.js";

const HISTORY_LIMIT = 60;

function buildInitialMetrics(): MetricStates {
  return {
    cpu: { current: 50, history: [] },
    memory: { current: 30, history: [] },
    network: { current: 500, history: [] },
    walker: { current: { x: 50, y: 50 }, history: [] },
    cursor: { current: { x: 0, y: 0 }, history: [] },
  };
}

const useDashboardStore = create<DashboardStore>()(() => ({
  metrics: buildInitialMetrics(),
  mode: "standard",
  theme: "standard",
  paused: false,
}));

function setMode(mode: "standard" | "creative") {
  useDashboardStore.setState({ mode });
}

function setTheme(theme: string) {
  useDashboardStore.setState({ theme });
}

function togglePause() {
  useDashboardStore.setState((state) => ({ paused: !state.paused }));
}

function updateMetrics() {
  const state = useDashboardStore.getState();
  if (state.paused) return;

  const timestamp = Date.now();
  const newMetrics = { ...state.metrics };

  // CPU - number metric
  const cpuResult = generators.cpu(undefined, newMetrics.cpu.current, timestamp);
  newMetrics.cpu = {
    current: cpuResult,
    history: [...newMetrics.cpu.history.slice(-(HISTORY_LIMIT - 1)), cpuResult],
  };

  // Memory - number metric
  const memResult = generators.memory(undefined, newMetrics.memory.current, timestamp);
  newMetrics.memory = {
    current: memResult,
    history: [...newMetrics.memory.history.slice(-(HISTORY_LIMIT - 1)), memResult],
  };

  // Network - number metric
  const netResult = generators.network(undefined, newMetrics.network.current, timestamp);
  newMetrics.network = {
    current: netResult,
    history: [...newMetrics.network.history.slice(-(HISTORY_LIMIT - 1)), netResult],
  };

  // Walker - point metric
  const walkResult = generators.walker(undefined, newMetrics.walker.current, timestamp);
  newMetrics.walker = {
    current: walkResult,
    history: [...newMetrics.walker.history.slice(-(HISTORY_LIMIT - 1)), walkResult],
  };

  // Cursor - point metric
  const cursorResult = generators.cursor(undefined, newMetrics.cursor.current, timestamp);
  newMetrics.cursor = {
    current: cursorResult,
    history: [...newMetrics.cursor.history.slice(-(HISTORY_LIMIT - 1)), cursorResult],
  };

  useDashboardStore.setState({ metrics: newMetrics });
}

export { useDashboardStore, setMode, setTheme, togglePause, updateMetrics };
