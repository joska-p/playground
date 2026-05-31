import { useEffect, type ReactNode } from "react";
import { useWorker } from "../hooks/useWorker.ts";

export type TaskBoundaryProps<I, O> = {
  fn: (input: I) => O;
  input: I;
  children: (result: O) => ReactNode;
  loading?: ReactNode;
  error?: (error: Error) => ReactNode;
};

export function TaskBoundary<I, O>(
  props: TaskBoundaryProps<I, O>
): ReactNode {
  const { fn, input, children, loading, error: errorFallback } = props;
  const { execute, status, result, error } = useWorker(fn);

  useEffect(() => {
    execute(input);
  }, [execute, input]);

  if (status === "running") {
    return <>{loading ?? null}</>;
  }

  if (status === "error" && error) {
    return <>{errorFallback ? errorFallback(error) : null}</>;
  }

  if (status === "success" && result !== undefined) {
    return <>{children(result)}</>;
  }

  return null;
}
