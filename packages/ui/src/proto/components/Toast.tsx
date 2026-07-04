import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Info, CheckCircle2, TriangleAlert, XCircle, Circle, X } from "lucide-react";
import { cn } from "../lib/cn";
import type { ColorVariant } from "../lib/colorVariant";

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  variant?: ColorVariant;
  /** Milliseconds before auto-dismiss. Defaults to 4000. Pass 0 to disable. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  exiting?: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const iconMap: Record<string, ReactNode> = {
  default: <Circle className="h-3.5 w-3.5" />,
  primary: <Info className="h-3.5 w-3.5" />,
  secondary: <CheckCircle2 className="h-3.5 w-3.5" />,
  accent: <Info className="h-3.5 w-3.5" />,
  warning: <TriangleAlert className="h-3.5 w-3.5" />,
  destructive: <XCircle className="h-3.5 w-3.5" />,
};

const iconColor: Record<string, string> = {
  default: "text-foreground-dim",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  warning: "text-warning",
  destructive: "text-destructive",
};

/**
 * ToastProvider — mirrors the source design's own guidance verbatim:
 * "toast: listener set + createPortal." A single portal renders every
 * queued toast into a fixed bottom-right stack; each toast animates in via
 * `.toast-item` and out via the `.exit` class before unmounting.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300); // matches toastOut animation duration
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
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
            {toasts.map((t) => {
              const key = t.variant ?? "default";
              return (
                <div
                  key={t.id}
                  className={cn("toast-item bg-surface-raised rounded-lg p-4 w-72", t.exiting && "exit")}
                  style={{ boxShadow: "var(--shadow-lg)" }}
                  role="status"
                >
                  <div className="flex gap-3">
                    <span className={cn("mt-0.5 text-xs", iconColor[key])}>{iconMap[key]}</span>
                    <div className="flex-1">
                      <p className="text-foreground text-[13px] font-medium">{t.title}</p>
                      {t.description && (
                        <p className="text-foreground-muted text-[11px] mt-1">{t.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => dismiss(t.id)}
                      aria-label="Dismiss notification"
                      className="text-foreground-dim hover:text-foreground cursor-pointer border-0 bg-transparent p-1 text-xs"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}
