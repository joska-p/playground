class SeededRandom {
  private seed: number;

  constructor(seedString: string) {
    // Turn the input string into a numeric hash seed
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    this.seed = Math.abs(hash) || 1; // Avoid 0
  }

  // Returns a float between 0 and 1
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Helper to pick a random item from an array based on the seed
  pick<T>(array: T[]): T {
    const index = Math.floor(this.next() * array.length);
    return array[index];
  }
}

export { SeededRandom };
