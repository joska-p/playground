export function* sinusoid(
  amplitude: number,
  frequency: number,
  phase = 0,
  sampleRate = 100
): Generator<number> {
  let t = 0;

  while (true) {
    yield amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
    t += 1 / sampleRate;
  }
}
