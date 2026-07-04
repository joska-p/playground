import { CheckCircle2, Circle, Info, TriangleAlert, X, XCircle } from 'lucide-react';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { ToastItem, ToastOptions } from '../../../hooks/useToastQueue';
import { cn } from '../../../lib/cn';
import { ToastContext } from './useToast';

const iconMap: Record<string, ReactNode> = {
  default: <Circle className="h-3.5 w-3.5" />,
  primary: <Info className="h-3.5 w-3.5" />,
  secondary: <CheckCircle2 className="h-3.5 w-3.5" />,
  accent: <Info className="h-3.5 w-3.5" />,
  warning: <TriangleAlert className="h-3.5 w-3.5" />,
  destructive: <XCircle className="h-3.5 w-3.5" />
};

const iconColor: Record<string, string> = {
  default: 'text-foreground-dim',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  warning: 'text-warning',
  destructive: 'text-destructive'
};

/**
 * ToastViewport — pure presentation. Renders whatever `toasts` array it's
 * given via a portal, matching the source design's own guidance verbatim:
 * "toast: listener set + createPortal." No internal state at all — this
 * component just maps props to markup.
 */
export function ToastViewport({
  toasts,
  onDismiss
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed right-4 bottom-4 z-9999 flex flex-col gap-2">
      {toasts.map((t) => {
        const key = t.variant ?? 'default';
        return (
          <div
            key={t.id}
            className={cn('toast-item bg-surface-raised w-72 rounded-lg p-4', t.exiting && 'exit')}
            style={{ boxShadow: 'var(--shadow-lg)' }}
            role="status"
          >
            <div className="flex gap-3">
              <span className={cn('mt-0.5 text-xs', iconColor[key])}>{iconMap[key]}</span>
              <div className="flex-1">
                <p className="text-foreground text-[13px] font-medium">{t.title}</p>
                {t.description && (
                  <p className="text-foreground-muted mt-1 text-[11px]">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => {
                  onDismiss(t.id);
                }}
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
  );
}

export type ToastProviderProps = {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
  children: ReactNode;
};

/**
 * ToastProvider — stateless. It never calls `useState`; `toasts`/`toast`/
 * `dismiss` are supplied by the caller (typically from the `useToastQueue`
 * hook) and relayed through context, with `ToastViewport` doing the actual
 * rendering.
 */
export function ToastProvider({ toasts, toast, dismiss, children }: ToastProviderProps) {
  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport
        toasts={toasts}
        onDismiss={dismiss}
      />
    </ToastContext.Provider>
  );
}
