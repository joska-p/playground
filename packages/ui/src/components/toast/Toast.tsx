import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

type ToastType = 'info' | 'success' | 'error';

type ToastItemData = {
  id: number;
  type: ToastType;
  title: string;
  description: string;
  exiting?: boolean;
};

type ToastContextValue = {
  info: (title: string, description: string) => void;
  success: (title: string, description: string) => void;
  error: (title: string, description: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastContainerProps = {
  children: ReactNode;
  className?: string;
};

function ToastContainer({ children, className }: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);
  const nextId = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description: string) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
        );
        setTimeout(() => { removeToast(id); }, 300);
      }, 4000);
    },
    [removeToast]
  );

  const info = useCallback(
    (title: string, description: string) => { addToast('info', title, description); },
    [addToast]
  );
  const success = useCallback(
    (title: string, description: string) => { addToast('success', title, description); },
    [addToast]
  );
  const error = useCallback(
    (title: string, description: string) => { addToast('error', title, description); },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ info, success, error }}>
      {children}
      <div className={cn('fixed bottom-4 right-4 z-50 flex flex-col gap-2', className)}>
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const iconMap = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  )
};

const iconColorMap = {
  info: 'text-primary',
  success: 'text-secondary',
  error: 'text-destructive'
};

function ToastItem({ item }: { item: ToastItemData }) {
  return (
    <div
      className={cn(
        'bg-surface text-foreground flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg min-w-72',
        'starting:opacity-0 starting:translate-x-10 starting:scale-95',
        'animate-[toastIn_0.4s_cubic-bezier(0.4,0,0.2,1)_both]',
        item.exiting && 'animate-[toastOut_0.3s_ease_both]'
      )}
    >
      <span className={cn('mt-0.5 shrink-0', iconColorMap[item.type])}>
        {iconMap[item.type]}
      </span>
      <div>
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
      </div>
    </div>
  );
}

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastContainer>');
  }
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ToastContainer, useToast };
export type { ToastType, ToastItemData, ToastContextValue };
