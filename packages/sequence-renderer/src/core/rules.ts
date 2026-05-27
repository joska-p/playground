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
  maxSteps: number;
  getNext: (params: NextStepParams) => number;
};

const recamanRule: SequenceRule = {
  name: "Recaman's Rule",
  id: "recaman",
  description: "Jump back by 'n' if possible, otherwise jump forward.",
  maxSteps: 1000,
  getNext: ({ index, current, seen }) => {
    const backward = current - index;
    return backward > 0 && !seen.has(backward) ? backward : current + index;
  },
};

const fibonacciRule: SequenceRule = {
  name: "Fibonacci",
  id: "fibonacci",
  description: "F(n) = F(n-1) + F(n-2). Grows exponentially.",
  maxSteps: 20,
  getNext: ({ index, current, sequence }) => {
    if (index <= 1) return index;
    return current + (sequence[index - 2] ?? 0);
  },
};

const primesRule: SequenceRule = {
  name: "Primes",
  id: "primes",
  description: "The sequence of prime numbers: 2, 3, 5, 7, 11...",
  maxSteps: 300,
  getNext: ({ current }) => {
    function isPrime(num: number) {
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0) return false;
      for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
        if (num % i === 0) return false;
      }
      return true;
    }

    const start = current === undefined || current === null ? 1 : current;
    let next = start + 1;
    while (!isPrime(next)) next++;
    return next;
  },
};

const triangularRule: SequenceRule = {
  name: "Triangular",
  id: "triangular",
  description: "Sum of integers up to n: 1, 3, 6, 10, 15...",
  maxSteps: 500,
  getNext: ({ index }) => (index * (index + 1)) / 2,
};

const collatzRule: SequenceRule = {
  name: "Collatz",
  id: "collatz",
  description: "Even: n/2 | Odd: 3n + 1. Eventually hits 1.",
  maxSteps: 500,
  getNext: ({ current }) => {
    if (current <= 1) return 1;
    return current % 2 === 0 ? current / 2 : 3 * current + 1;
  },
};

const sequencesRule: SequenceRule[] = [
  recamanRule,
  fibonacciRule,
  primesRule,
  triangularRule,
  collatzRule,
];

export { recamanRule, sequencesRule };
