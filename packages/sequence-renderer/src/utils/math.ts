function findBiggestInterval(numbers: number[]): number {
  if (numbers.length < 2) return 0;

  return numbers.slice(1).reduce((biggest, current, index) => {
    const prev = numbers[index] ?? 0;
    const interval = Math.abs(current - prev);
    return Math.max(biggest, interval);
  }, 0);
}

export { findBiggestInterval };
