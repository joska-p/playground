export type FrameCallback = (time: number, delta: number) => void;

export type FrameLoop = {
        readonly isRunning: boolean;
        readonly subscriberCount: number;
        subscribe(cb: FrameCallback): () => void;
        dispose(): void;
};

export function createFrameLoop(): FrameLoop {
        const callbacks = new Set<FrameCallback>();
        let rafId = 0;
        let running = false;
        let lastTime = 0;

        const tick = (now: number): void => {
                if (!running) return;
                const delta = (now - lastTime) / 1000;
                lastTime = now;
                const time = now / 1000;
                rafId = requestAnimationFrame(tick);
                for (const cb of callbacks) {
                        cb(time, delta);
                }
        };

        const start = (): void => {
                if (running) return;
                running = true;
                lastTime = performance.now();
                tick(lastTime);
        };

        const stop = (): void => {
                running = false;
                if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = 0;
                }
        };

        return {
                get isRunning(): boolean {
                        return running;
                },

                get subscriberCount(): number {
                        return callbacks.size;
                },

                subscribe(cb: FrameCallback): () => void {
                        callbacks.add(cb);
                        if (!running) start();
                        return () => {
                                callbacks.delete(cb);
                                if (callbacks.size === 0) stop();
                        };
                },

                dispose(): void {
                        stop();
                        callbacks.clear();
                }
        };
}
