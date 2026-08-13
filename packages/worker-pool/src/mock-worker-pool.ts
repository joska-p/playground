type Handler<TTask, TResult> = (task: TTask) => TResult;

/** Synchronous mock implementation of WorkerPool for unit testing without Web Workers. */
export class MockWorkerPool<TTask, TResult> {
    private handler: Handler<TTask, TResult>;

    /**
     * Initializes a MockWorkerPool with a synchronous handler function.
     *
     * @param handler - Function that produces a result directly from a task.
     */
    constructor(handler: Handler<TTask, TResult>) {
        this.handler = handler;
    }

    /**
     * Executes the task inline via the handler and returns a resolved promise.
     *
     * @param task - The task payload.
     * @returns Promise resolving immediately to the handler result.
     */
    run(task: TTask): Promise<TResult> {
        return Promise.resolve(this.handler(task));
    }

    /** No-op teardown method for interface compatibility. */
    teardown(): void {
        return undefined;
    }
}
