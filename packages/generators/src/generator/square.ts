export function* square(amplitude: number, frequency: number, dutyCycle = 0.5): Generator<number> {
  let t = 0;
  const sampleRate = 100; // 100 samples per second

  while (true) {
    const period = 1 / frequency;
    const timeInPeriod = t % period;
    const value = timeInPeriod < period * dutyCycle ? amplitude : -amplitude;
    yield value;
    t += 1 / sampleRate;
  }
}
