import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ColorVariant } from "../lib/colorVariant";

export type ToastOptions = {
  title: ReactNode;
  description?: ReactNode;
  variant?: ColorVariant;
  /** Milliseconds before auto-dismiss. Defaults to 4000. Pass 0 to disable. */
  duration?: number;
}

export type ToastItem = {
  id: number;
  exiting?: boolean;
} & ToastOptions

/**
 * useToastQueue — the state hook behind the toast system. `ToastProvider`
 * and `ToastViewport` are both stateless; this hook is where the toast
 * list, id counter, and dismiss timers actually live.
 *
 *   const queue = useToastQueue();
 *   queue.toast({ title: "saved" });
 *   <ToastProvider toasts={queue.toasts} dismiss={queue.dismiss}>...</ToastProvider>
 */
export function useToastQueue() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300); // matches the .toastOut animation duration in globals.css
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    ({ duration = 4000, ...options }: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, ...options }]);
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => { dismiss(id); }, duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  return { toasts, toast, dismiss };
}
