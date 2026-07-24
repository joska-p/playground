export type Point = {
  drawingId: string | number;
  label: string;
  x: number;
  y: number;
};

export type Domain = [number, number];

export type ChartBounds = {
  xDomain: Domain;
  yDomain: Domain;
};

/**
 * Calculates domain bounds with padding ahead of time.
 * Clamps domain minimum to 0 if the original dataset is strictly non-negative.
 */
export function computeChartBounds(
  data: Point[],
  options: { padRatio?: number; clampToZero?: boolean } = {}
): ChartBounds {
  if (data.length === 0) {
    return { xDomain: [0, 1], yDomain: [0, 1] };
  }

  const { padRatio = 0.05, clampToZero = true } = options;

  const createDomain = (values: number[]): Domain => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    let domainMin = min - range * padRatio;
    const domainMax = max + range * padRatio;

    // Prevent positive/zero baselines from generating negative domains/ticks
    if (clampToZero && min >= 0 && domainMin < 0) {
      domainMin = 0;
    }

    return [domainMin, domainMax];
  };

  return {
    xDomain: createDomain(data.map((d) => d.x)),
    yDomain: createDomain(data.map((d) => d.y))
  };
}

/**
 * Generates N linearly spaced tick values across a given domain.
 */
export function getTicks(domain: Domain, count = 5): number[] {
  const [min, max] = domain;
  if (count <= 1) return [min];

  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => min + i * step);
}

/**
 * Generates scalar mapping functions for standard pixel scaling.
 */
export function createScalers(
  xDomain: Domain,
  yDomain: Domain,
  dimensions: {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
  }
) {
  const { width, height, margin } = dimensions;

  const xScale = (v: number) => {
    const range = xDomain[1] - xDomain[0];
    if (range === 0) return margin.left;
    return margin.left + ((v - xDomain[0]) / range) * (width - margin.left - margin.right);
  };

  const yScale = (v: number) => {
    const range = yDomain[1] - yDomain[0];
    if (range === 0) return height - margin.bottom;
    return (
      height - margin.bottom - ((v - yDomain[0]) / range) * (height - margin.top - margin.bottom)
    );
  };

  return { xScale, yScale };
}
