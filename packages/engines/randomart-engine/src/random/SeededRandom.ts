class SeededRandom {
  private seed: number;
  public initialHash: number;
  public choiceHistory: number[] = [];

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

    this.choiceHistory.push(result);
    return result;
  }
}

export { SeededRandom };
