import { useEffect } from "react";

import { useTimeout } from "@/hooks/use-timeout";

const useDebounce = (
  callback: (...args: unknown[]) => unknown,
  delay: number,
  dependencies: React.DependencyList
): void => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export { useDebounce };
