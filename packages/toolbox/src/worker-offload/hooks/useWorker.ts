import { useCallback, useEffect, useRef, useState } from "react";

type UseWorkerStatus = "idle" | "running" | "success" | "error";

type UseWorkerReturn<TOutput> = {
  execute: <TInput>(input: TInput) => Promise<TOutput>;
  status: UseWorkerStatus;
  result: TOutput | undefined;
  error: Error | undefined;
};

function compileFn<I, O>(fn: (input: I) => O): string {
  const source = fn.toString();

  if (/\[native code\]/.test(source)) {
    throw new TypeError(
      "useWorker requires a user-defined function, got a native function"
    );
  }

  return [
    `self.onmessage=function(e){`,
    `  var fn=${source};`,
    `  var msg=e.data;`,
    `  try{`,
    `    var r=fn(msg._input);`,
    `    self.postMessage({_taskId:msg._taskId,_output:r});`,
    `  }catch(e){`,
    `    self.postMessage({_taskId:msg._taskId,_error:e instanceof Error?e.message:String(e)});`,
    `  }`,
    `};`,
  ].join("");
}

export function useWorker<I, O>(
  fn: (input: I) => O
): UseWorkerReturn<O> {
  const workerRef = useRef<Worker | null>(null);
  const urlRef = useRef<string | null>(null);
  const [status, setStatus] = useState<UseWorkerStatus>("idle");
  const [result, setResult] = useState<O | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const execute = useCallback(
    <TInput extends I>(input: TInput): Promise<O> => {
      workerRef.current?.terminate();

      if (urlRef.current !== null) {
        URL.revokeObjectURL(urlRef.current);
      }
      const code = compileFn(fn);
      urlRef.current = URL.createObjectURL(
        new Blob([code], { type: "application/javascript" })
      );

      const worker = new Worker(urlRef.current);
      workerRef.current = worker;

      setStatus("running");
      setResult(undefined);
      setError(undefined);

      const promise = new Promise<O>((resolve, reject) => {
        worker.onmessage = (e) => {
          const response = e.data as { _output: unknown } | { _error: string };
          if ("_error" in response) {
            reject(new Error(response._error));
          } else {
            resolve(response._output as O);
          }
        };

        worker.postMessage({ _input: input, _taskId: 1 });
      });

      promise.then(
        (v) => { setStatus("success"); setResult(v); },
        (e) => { setStatus("error"); setError(e as Error); }
      );

      return promise;
    },
    [fn]
  );

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      if (urlRef.current !== null) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, []);

  return { execute, status, result, error };
}
