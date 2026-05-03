import type { MemoryRule } from "../types.js";

const gradualMemoryRule: MemoryRule = {
  id: "gradual",
  name: "Gradual Increase",
  getNext: (context) => {
    if (context.performanceMemory) {
      return (
        (context.performanceMemory.usedJSHeapSize / context.performanceMemory.jsHeapSizeLimit) * 100
      );
    }
    const drift = Math.random() * 2;
    const next = context.current + drift;
    return Math.min(95, Math.max(0, next));
  },
};

const stepMemoryRule: MemoryRule = {
  id: "step",
  name: "Step Pattern",
  getNext: (context) => {
    if (context.performanceMemory) {
      return (
        (context.performanceMemory.usedJSHeapSize / context.performanceMemory.jsHeapSizeLimit) * 100
      );
    }
    const t = Math.floor(context.timestamp / 5000);
    const base = 30 + (t % 3) * 20;
    return base + Math.random() * 10;
  },
};

export { gradualMemoryRule, stepMemoryRule };
