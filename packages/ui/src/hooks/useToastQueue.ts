import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import type { ColorVariant } from '../lib/colorVariant';

export interface ToastOptions {
    title: ReactNode;
    description?: ReactNode;
    variant?: ColorVariant;
    /** 0 disables auto-dismiss. */
    duration?: number;
}

export type ToastItem = {
    id: number;
    exiting?: boolean;
} & ToastOptions;

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
                    setTimeout(() => {
                        dismiss(id);
                    }, duration)
                );
            }
            return id;
        },
        [dismiss]
    );

    return { toasts, toast, dismiss };
}
