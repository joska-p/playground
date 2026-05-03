import { describe, it, expect } from "vitest";
import { sineCpuRule, randomCpuRule, spikeCpuRule } from "../cpu-rules.js";

describe("sineCpuRule", () => {
  it("returns a value between 0 and 100", () => {
    const value = sineCpuRule.getNext({ current: 50, timestamp: Date.now() });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("produces varied output over time", () => {
    const values = Array.from({ length: 10 }, (_, i) =>
      sineCpuRule.getNext({ current: 50, timestamp: i * 10000 })
    );
    const unique = new Set(values);
    expect(unique.size).toBeGreaterThan(1);
  });
});

describe("randomCpuRule", () => {
  it("returns a value between 0 and 100", () => {
    const value = randomCpuRule.getNext({ current: 50, timestamp: Date.now() });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("produces varied output", () => {
    const values = Array.from({ length: 10 }, () =>
      randomCpuRule.getNext({ current: 50, timestamp: Date.now() })
    );
    const unique = new Set(values);
    expect(unique.size).toBeGreaterThan(1);
  });
});

describe("spikeCpuRule", () => {
  it("returns a value between 0 and 100", () => {
    const value = spikeCpuRule.getNext({ current: 20, timestamp: 2000 });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("spikes high during first 500ms of each 10s window", () => {
    const spikeValue = spikeCpuRule.getNext({ current: 20, timestamp: 200 });
    expect(spikeValue).toBeGreaterThanOrEqual(90);
  });

  it("is low outside spike window", () => {
    const lowValue = spikeCpuRule.getNext({ current: 20, timestamp: 5000 });
    expect(lowValue).toBeLessThanOrEqual(40);
  });
});
