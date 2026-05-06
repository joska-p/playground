interface SinusoidOptions {
  amplitude: number;
  frequency: number;
  phase?: number;
  sampleRate?: number;
}

function* sinusoid({
  amplitude,
  frequency,
  phase = 0,
  sampleRate = 100,
}: SinusoidOptions): Generator<number> {
  let t = 0;

  while (true) {
    yield amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
    t += 1 / sampleRate;
  }
}

export { sinusoid };
