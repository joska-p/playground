type Handler<TTask, TResult> = (task: TTask) => TResult;

export class MockWorkerPool<TTask, TResult> {
  private handler: Handler<TTask, TResult>;

  constructor(handler: Handler<TTask, TResult>) {
    this.handler = handler;
  }

  run(task: TTask): Promise<TResult> {
    return Promise.resolve(this.handler(task));
  }

  teardown(): void { return undefined; }
}
