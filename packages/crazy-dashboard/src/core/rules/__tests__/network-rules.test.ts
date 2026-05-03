import { describe, it, expect, vi, beforeEach } from "vitest";
import { steadyNetworkRule, burstyNetworkRule } from "../network-rules.js";

describe("steadyNetworkRule", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a positive number", () => {
    const value = steadyNetworkRule.getNext({
      current: 500,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThanOrEqual(0);
  });

  it("uses navigator.connection when available", () => {
    const value = steadyNetworkRule.getNext({
      current: 500,
      timestamp: Date.now(),
      navigatorConnection: { downlink: 10, rtt: 50 },
    });
    expect(value).toBe(10000);
  });

  it("falls back to simulation when navigatorConnection not provided", () => {
    const value = steadyNetworkRule.getNext({
      current: 500,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThan(400);
    expect(value).toBeLessThan(700);
  });
});

describe("burstyNetworkRule", () => {
  it("returns a positive number", () => {
    const value = burstyNetworkRule.getNext({
      current: 500,
      timestamp: Date.now(),
    });
    expect(value).toBeGreaterThanOrEqual(0);
  });

  it("bursts high in first 1000ms of each 8s window", () => {
    const burstValue = burstyNetworkRule.getNext({
      current: 500,
      timestamp: 500,
    });
    expect(burstValue).toBeGreaterThan(1500);
  });

  it("is low outside burst window", () => {
    const lowValue = burstyNetworkRule.getNext({
      current: 500,
      timestamp: 5000,
    });
    expect(lowValue).toBeLessThan(600);
  });
});
