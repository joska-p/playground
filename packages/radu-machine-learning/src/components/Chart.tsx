import { ControlSection } from '@repo/ui/control-panel';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const value = lerp(Math.random(), Math.random(), 0.5);

function Chart() {
  return <ControlSection title="chart">{value}</ControlSection>;
}

export { Chart };
