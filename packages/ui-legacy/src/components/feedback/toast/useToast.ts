import { createContext, useContext } from 'react';
import type { ToastContextValue } from './types';

const ToastContext = createContext<ToastContextValue | null>(null);

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastContainer>');
  }
  return ctx;
}

export { ToastContext, useToast };
