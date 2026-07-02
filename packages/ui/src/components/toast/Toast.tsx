import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { ToastItem } from './ToastItem';
import type { ToastItemData } from './types';
import { ToastContext } from './useToast';

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
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
        setTimeout(() => {
          removeToast(id);
        }, 300);
      }, 4000);
    },
    [removeToast]
  );

  const info = useCallback(
    (title: string, description: string) => {
      addToast('primary', title, description);
    },
    [addToast]
  );
  const success = useCallback(
    (title: string, description: string) => {
      addToast('secondary', title, description);
    },
    [addToast]
  );
  const error = useCallback(
    (title: string, description: string) => {
      addToast('destructive', title, description);
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ info, success, error }}>
      {children}
      <div className={cn('fixed right-4 bottom-4 z-50 flex flex-col gap-2', className)}>
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            item={t}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastContainer };
