import { Button } from '@repo/ui/data-entry';
import { ToastProvider, ToastViewport } from '@repo/ui/feedback';
import type { ToastItem, ToastOptions } from '@repo/ui/hooks/useToastQueue';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useRef, useState } from 'react';

const meta: Meta<typeof ToastProvider> = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

const variants = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

function useToastState() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ duration = 4000, ...options }: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, ...options }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  return { toasts, toast, dismiss };
}

export const Default: Story = {
  render: () => {
    const queue = useToastState();
    return (
      <ToastProvider
        toasts={queue.toasts}
        toast={queue.toast}
        dismiss={queue.dismiss}
      >
        <div className="flex min-h-48 items-center justify-center p-8">
          <Button
            variant="primary"
            size="sm"
            onClick={() => queue.toast({ title: 'Changes saved', variant: 'primary' })}
          >
            Show Toast
          </Button>
        </div>
        <ToastViewport
          toasts={queue.toasts}
          onDismiss={queue.dismiss}
        />
      </ToastProvider>
    );
  }
};

export const WithDescription: Story = {
  render: () => {
    const queue = useToastState();
    return (
      <ToastProvider
        toasts={queue.toasts}
        toast={queue.toast}
        dismiss={queue.dismiss}
      >
        <div className="flex min-h-48 items-center justify-center p-8">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              queue.toast({
                title: 'Export complete',
                description: 'Your file has been saved to the downloads folder.',
                variant: 'secondary'
              })
            }
          >
            Show With Description
          </Button>
        </div>
        <ToastViewport
          toasts={queue.toasts}
          onDismiss={queue.dismiss}
        />
      </ToastProvider>
    );
  }
};

export const AllVariants: Story = {
  render: () => {
    const queue = useToastState();
    return (
      <ToastProvider
        toasts={queue.toasts}
        toast={queue.toast}
        dismiss={queue.dismiss}
      >
        <div className="flex min-h-48 flex-wrap items-center justify-center gap-3 p-8">
          {variants.map((v) => (
            <Button
              key={v}
              variant={v}
              size="sm"
              onClick={() => queue.toast({ title: `Toast ${v}`, variant: v })}
            >
              {v}
            </Button>
          ))}
        </div>
        <ToastViewport
          toasts={queue.toasts}
          onDismiss={queue.dismiss}
        />
      </ToastProvider>
    );
  }
};

export const Multiple: Story = {
  render: () => {
    const queue = useToastState();
    return (
      <ToastProvider
        toasts={queue.toasts}
        toast={queue.toast}
        dismiss={queue.dismiss}
      >
        <div className="flex min-h-48 items-center justify-center p-8">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              variants.forEach((v) => {
                queue.toast({ title: `Notification ${v}`, variant: v });
              })
            }
          >
            Show All Toasts
          </Button>
        </div>
        <ToastViewport
          toasts={queue.toasts}
          onDismiss={queue.dismiss}
        />
      </ToastProvider>
    );
  }
};
