// Maximum number of draws retained in choiceHistory.
// Prevents unbounded growth during repeated tree generation or shader previews.
const HISTORY_LIMIT = 1024;

export class SeededRandom {
  private seed: number;
  public readonly initialHash: number;
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

    if (this.choiceHistory.length < HISTORY_LIMIT) {
      this.choiceHistory.push(result);
    }

    return result;
  }
}
