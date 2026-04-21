export type NextStepParams = {
  index: number;
  current: number;
  sequence: number[];
  seen: Set<number>;
};

export type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number; // The safety limit for the UI
  getNext: (params: NextStepParams) => number;
};

export const recamanRule: SequenceRule = {
  name: "Recaman's Rule",
  id: "recaman",
  description: "Jump back by 'n' if possible, otherwise jump forward.",
  maxSteps: 1000, // Very stable, can handle many steps
  getNext: ({ index, current, seen }) => {
    const backward = current - index;
    return backward > 0 && !seen.has(backward) ? backward : current + index;
  },
};

export const fibonacciRule: SequenceRule = {
  name: "Fibonacci",
  id: "fibonacci",
  description: "F(n) = F(n-1) + F(n-2). Grows exponentially.",
  maxSteps: 20, // Safe limit before exceeding Number.MAX_SAFE_INTEGER
  getNext: ({ index, current, sequence }) => {
    if (index <= 1) return index;
    return current + (sequence[index - 2] ?? 0);
  },
};

export const primesRule: SequenceRule = {
  name: "Primes",
  id: "primes",
  description: "The sequence of prime numbers: 2, 3, 5, 7, 11...",
  maxSteps: 300,
  getNext: ({ current }) => {
    const isPrime = (num: number) => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
      return num > 1;
    };
    let next = (current || 1) + 1;
    while (!isPrime(next)) next++;
    return next;
  },
};

export const triangularRule: SequenceRule = {
  name: "Triangular",
  id: "triangular",
  description: "Sum of integers up to n: 1, 3, 6, 10, 15...",
  maxSteps: 500,
  getNext: ({ index }) => (index * (index + 1)) / 2,
};

export const collatzRule: SequenceRule = {
  name: "Collatz",
  id: "collatz",
  description: "Even: n/2 | Odd: 3n + 1. Eventually hits 1.",
  maxSteps: 500,
  getNext: ({ current }) => {
    if (current <= 1) return 1;
    return current % 2 === 0 ? current / 2 : 3 * current + 1;
  },
};

export const sequencesRule: SequenceRule[] = [
  recamanRule,
  fibonacciRule,
  primesRule,
  triangularRule,
  collatzRule,
];
