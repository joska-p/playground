type FrameCallback = (time: number, delta: number) => void;

export class FrameLoop {
  private callbacks = new Set<FrameCallback>();
  private rafId = 0;
  private running = false;
  private lastTime = 0;

  subscribe(cb: FrameCallback): () => void {
    this.callbacks.add(cb);
    if (!this.running) this.start();
    return () => {
      this.callbacks.delete(cb);
      if (this.callbacks.size === 0) this.stop();
    };
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  private stop(): void {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const time = now / 1000;
    for (const cb of this.callbacks) {
      cb(time, delta);
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  get isRunning(): boolean {
    return this.running;
  }

  get subscriberCount(): number {
    return this.callbacks.size;
  }

  dispose(): void {
    this.stop();
    this.callbacks.clear();
  }
}
