import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { ToastItem } from './ToastItem';
import type { ToastItemData, ToastVariant } from './types';
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
    (variant: ToastVariant, title: string, description: string) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, variant, title, description }]);

      // Trigger exit animation
      setTimeout(() => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
        // Remove from DOM after exit animation completes
        setTimeout(() => {
          removeToast(id);
        }, 300);
      }, 4000);
    },
    [removeToast]
  );

  const info = (title: string, desc: string) => {
    addToast('primary', title, desc);
  };
  const success = (title: string, desc: string) => {
    addToast('secondary', title, desc);
  };
  const error = (title: string, desc: string) => {
    addToast('destructive', title, desc);
  };
  const warning = (title: string, desc: string) => {
    addToast('warning', title, desc);
  };

  return (
    <ToastContext.Provider value={{ info, success, error, warning }}>
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
