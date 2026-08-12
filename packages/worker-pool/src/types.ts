/**
 * Discriminated union representing the result returned from a worker task execution.
 */
export type WorkerResult<T> = { ok: true; value: T } | { ok: false; error: Error };

/**
 * Configuration options for initializing a WorkerPool.
 */
export type WorkerPoolConfig<TTask, TResult> = {
    /** Creates a fresh Worker instance. The consumer owns URL creation and bundler flags. */
    workerFactory: () => Worker;
    /** Maximum number of workers allowed in the pool. Defaults to 4. */
    maxPoolSize?: number;
    /** Serializes a typed task into a postMessage payload and optional transferable objects. */
    serialize: (task: TTask) => { message: unknown; transfer?: Transferable[] };
    /** Deserializes a worker MessageEvent into a typed WorkerResult. */
    deserialize: (event: MessageEvent) => WorkerResult<TResult>;
};
