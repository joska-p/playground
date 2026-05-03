import type { CpuRule } from "../types.js";

function getSineCpu(context: { current: number; timestamp: number }): number {
  const base = 50;
  const amplitude = 30;
  const frequency = 0.001;
  return base + amplitude * Math.sin(context.timestamp * frequency);
}

const sineCpuRule: CpuRule = {
  id: "sine",
  name: "Sine Wave",
  getNext: (context) => {
    const value = getSineCpu(context);
    return Math.max(0, Math.min(100, value));
  },
};

function getRandomCpu(context: { current: number; timestamp: number }): number {
  const drift = (Math.random() - 0.5) * 10;
  const next = context.current + drift;
  return Math.max(0, Math.min(100, next));
}

const randomCpuRule: CpuRule = {
  id: "random",
  name: "Random Walk",
  getNext: (context) => {
    return getRandomCpu(context);
  },
};

const spikeCpuRule: CpuRule = {
  id: "spike",
  name: "Spike Pattern",
  getNext: (context) => {
    const t = context.timestamp % 10000;
    if (t < 500) return 90 + Math.random() * 10;
    return 20 + Math.random() * 20;
  },
};

export { sineCpuRule, randomCpuRule, spikeCpuRule };
