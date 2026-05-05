export function* constant(value: number): Generator<number> {
  while (true) {
    yield value;
  }
}
