export type SequenceRule = {
  name: string;
  id: string;
  getNext: (step: number, current: number, seen: Set<number>) => number;
};

export const recamanRule: SequenceRule = {
  name: "Recaman's Rule",
  id: "recaman",
  getNext: (step, current, seen) => {
    const backward = current - step;
    return backward > 0 && !seen.has(backward) ? backward : current + step;
  },
};

export const FibonacciRule: SequenceRule = {
  name: "Fibonacci",
  id: "fibonacci",
  getNext: (step, current, seen) => {
    const lastValue = Array.from(seen).pop();
    if (step === 1 || !lastValue) return 1;
    return lastValue + current;
  },
};

export const sequencesRule: SequenceRule[] = [recamanRule, FibonacciRule];
