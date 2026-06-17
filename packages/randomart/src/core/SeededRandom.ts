class SeededRandom {
  private seed: number;
  public initialHash: number; // 👈 Track the base integer
  public choiceHistory: number[] = []; // 👈 Record every random number generated

  constructor(seedString: string) {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    this.initialHash = Math.abs(hash) || 1;
    this.seed = this.initialHash;
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    const result = x - Math.floor(x);

    this.choiceHistory.push(result); // 👈 Save the decimal number choice
    return result;
  }
}

export { SeededRandom };
