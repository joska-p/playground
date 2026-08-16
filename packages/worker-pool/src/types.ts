export type WorkerResult<T> = { ok: true; value: T } | { ok: false; error: Error };

export type WorkerPoolConfig<TTask, TResult> = {
    /** The consumer owns URL creation and bundler-specific flags. */
    workerFactory: () => Worker;
    /** Defaults to 4. */
    maxPoolSize?: number;
    serialize: (task: TTask) => { message: unknown; transfer?: Transferable[] };
    deserialize: (event: MessageEvent) => WorkerResult<TResult>;
};
