export type WorkerResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

export type WorkerPoolConfig<TTask, TResult> = {
  workerFactory: () => Worker;
  maxPoolSize?: number;
  serialize: (task: TTask) => { message: unknown; transfer?: Transferable[] };
  deserialize: (event: MessageEvent) => WorkerResult<TResult>;
};
