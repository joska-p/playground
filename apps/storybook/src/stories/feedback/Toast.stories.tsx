import { Button } from '@repo/ui/data-entry';
import { ToastProvider } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

let nextId = 1;

const variants = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

const meta: Meta<typeof ToastProvider> = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const AllVariants: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; title: string; description?: string; variant: string; exiting?: boolean }>
    >([]);

    const dismiss = useCallback((id: number) => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, []);

    const addToast = useCallback(
      (variant: string) => {
        const id = nextId++;
        setToasts((prev) => [
          ...prev,
          {
            id,
            title: `Toast ${variant}`,
            description: 'This is a toast notification with a description.',
            variant
          }
        ]);
        setTimeout(() => dismiss(id), 4000);
      },
      [dismiss]
    );

    return (
      <ToastProvider
        toasts={toasts}
        toast={(opts) => {
          const id = nextId++;
          setToasts((prev) => [...prev, { id, ...opts }]);
          return id;
        }}
        dismiss={dismiss}
      >
        <div className="flex min-h-48 flex-wrap items-center justify-center gap-3 p-8">
          {variants.map((v) => (
            <Button
              key={v}
              variant={v === 'destructive' ? 'destructive' : v === 'warning' ? 'warning' : 'ghost'}
              size="sm"
              onClick={() => addToast(v)}
            >
              {v}
            </Button>
          ))}
        </div>
      </ToastProvider>
    );
  }
};

export const Multiple: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; title: string; variant: string; exiting?: boolean }>
    >([]);

    const dismiss = useCallback((id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addBatch = useCallback(() => {
      const batch = variants.map((v, i) => ({
        id: nextId++,
        title: `Notification ${i + 1}`,
        variant: v
      }));
      setToasts((prev) => [...prev, ...batch]);
    }, []);

    return (
      <ToastProvider
        toasts={toasts}
        toast={(opts) => {
          const id = nextId++;
          setToasts((prev) => [...prev, { id, ...opts }]);
          return id;
        }}
        dismiss={dismiss}
      >
        <div className="flex min-h-48 items-center justify-center p-8">
          <Button
            variant="primary"
            size="sm"
            onClick={addBatch}
          >
            Show All Toasts
          </Button>
        </div>
      </ToastProvider>
    );
  }
};
