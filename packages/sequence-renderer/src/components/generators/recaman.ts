function createRecamanSequence(n: number): number[] {
  if (n <= 0) return [];

  const sequence: number[] = [0];
  const seen: Set<number> = new Set([0]);

  let current = 0;

  for (let step = 1; step < n; step++) {
    const backward = current - step;

    if (backward > 0 && !seen.has(backward)) {
      current = backward;
    } else {
      current = current + step;
    }

    sequence.push(current);
    seen.add(current);
  }

  return sequence;
}

export { createRecamanSequence };
