export function* random(min: number, max: number): Generator<number> {
  // Note: Math.random() returns [0,1), so max is exclusive
  while (true) {
    yield min + Math.random() * (max - min);
  }
}
