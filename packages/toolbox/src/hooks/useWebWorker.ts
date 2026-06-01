import { useCallback, useRef, useState } from "react";

type WorkerFunction<TInput, TOutput> = (input: TInput) => TOutput;

type WorkerState<TInput, TOutput> = {
  result: TOutput | null;
  loading: boolean;
  error: string | null;
  run: (input: TInput) => void;
};

function useWebWorker<TInput, TOutput>(
  workerFunction: WorkerFunction<TInput, TOutput>
): WorkerState<TInput, TOutput> {
  const [result, setResult] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);

  const run = useCallback(
    (input: TInput) => {
      // Terminate any in-flight worker before starting a new one
      workerRef.current?.terminate();

      setLoading(true);
      setError(null);

      const workerScript = `
      self.onmessage = function(e) {
        const fn = ${workerFunction.toString()};
        const result = fn(e.data);
        self.postMessage(result);
      };
    `;

      const blob = new Blob([workerScript], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      workerRef.current = worker;

      worker.onmessage = (event: MessageEvent<TOutput>) => {
        setResult(event.data);
        setLoading(false);
        URL.revokeObjectURL(url);
      };

      worker.onerror = (event: ErrorEvent) => {
        setError(event.message);
        setLoading(false);
        URL.revokeObjectURL(url);
      };

      worker.postMessage(input);
    },
    [workerFunction]
  );

  return { result, loading, error, run };
}

export { useWebWorker };
