export function createWorkerFunction<I, O>(fn: (input: I) => O): {
  createWorker: () => Worker;
  revoke: () => void;
} {
  const source = fn.toString();

  if (/\[native code\]/.test(source)) {
    throw new TypeError(
      "createWorkerFunction requires a user-defined function, got a native function"
    );
  }

  const code = [
    `self.onmessage = function(e) {`,
    `  var fn = ${source};`,
    `  var msg = e.data;`,
    `  try {`,
    `    var result = fn(msg._input);`,
    `    self.postMessage({ _taskId: msg._taskId, _output: result });`,
    `  } catch (err) {`,
    `    self.postMessage({ _taskId: msg._taskId, _error: err instanceof Error ? err.message : String(err) });`,
    `  }`,
    `};`,
  ].join("\n");

  const blob = new Blob([code], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);

  return {
    createWorker: (): Worker => new Worker(url),
    revoke: (): void => URL.revokeObjectURL(url),
  };
}
