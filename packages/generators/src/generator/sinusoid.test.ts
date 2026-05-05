import { describe, it, expect } from "vitest";
import { sinusoid } from "./sinusoid.js";

describe("sinusoid generator", () => {
  it("should generate sinusoidal values", () => {
    const gen = sinusoid(1, 1);
    const values = [gen.next().value, gen.next().value, gen.next().value];
    expect(values[0]).toBeCloseTo(0, 1);
    expect(values[1]).toBeCloseTo(Math.sin(2 * Math.PI * 0.01), 2);
    expect(values[2]).toBeCloseTo(Math.sin(2 * Math.PI * 0.02), 2);
  });

  it("should respect amplitude", () => {
    const gen = sinusoid(5, 1);
    expect(gen.next().value).toBeCloseTo(0, 1);
  });

  it("should respect phase", () => {
    const gen = sinusoid(1, 1, Math.PI / 2);
    expect(gen.next().value).toBeCloseTo(1, 1);
  });

  it("should complete full period", () => {
    const gen = sinusoid(1, 1); // frequency=1 means 1Hz, period=1s
    const samplesPerPeriod = 100; // sampleRate=100
    const values: number[] = [];
    for (let i = 0; i < samplesPerPeriod; i++) values.push(gen.next().value);
    // After one period, should return to start value
    expect(gen.next().value).toBeCloseTo(values[0] ?? 0, 5);
  });

  it("should handle negative amplitude", () => {
    const gen = sinusoid(-1, 1);
    expect(gen.next().value).toBeCloseTo(0, 1);
    expect(gen.next().value).toBeCloseTo(-Math.sin(2 * Math.PI * 0.01), 2);
  });

  it("should be infinite", () => {
    const gen = sinusoid(1, 1);
    for (let i = 0; i < 1000; i++) gen.next();
    expect(gen.next().done).toBe(false);
  });
});
