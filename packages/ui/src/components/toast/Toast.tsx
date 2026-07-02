import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { toastVariants } from './toastVariants';

type ToastItemData = {
  id: number;
  variant: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'warning';
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
    (variant: ToastItemData['variant'], title: string, description: string) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, variant, title, description }]);
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
    (title: string, description: string) => { addToast('primary', title, description); },
    [addToast]
  );
  const success = useCallback(
    (title: string, description: string) => { addToast('secondary', title, description); },
    [addToast]
  );
  const error = useCallback(
    (title: string, description: string) => { addToast('destructive', title, description); },
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

const iconMap: Record<ToastItemData['variant'], ReactNode> = {
  default: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  primary: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  secondary: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  accent: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  destructive: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
};

const iconColorMap: Record<ToastItemData['variant'], string> = {
  default: 'text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  destructive: 'text-destructive',
  warning: 'text-warning'
};

function ToastItem({ item }: { item: ToastItemData }) {
  return (
    <div
      className={cn(
        toastVariants({ variant: item.variant }),
        item.exiting && 'animate-[toastOut_0.3s_ease_both]'
      )}
    >
      <span className={cn('mt-0.5 shrink-0', iconColorMap[item.variant])}>
        {iconMap[item.variant]}
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
export type { ToastItemData, ToastContextValue };
