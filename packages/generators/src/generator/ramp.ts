export function* ramp(start: number, end: number, duration: number): Generator<number> {
  if (duration <= 0) {
    yield start;
    return;
  }

  const steps = duration * 100; // 100 samples per second
  const numSamples = steps + 1; // Include both start and end
  const increment = (end - start) / steps;

  for (let i = 0; i < numSamples; i++) {
    yield start + increment * i;
  }
}
