export function* sinusoid(amplitude: number, frequency: number, phase = 0): Generator<number> {
  let t = 0;
  const sampleRate = 100; // 100 samples per second
  
  while (true) {
    yield amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
    t += 1 / sampleRate;
  }
}
