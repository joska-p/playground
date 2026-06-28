import { Button } from '@repo/ui/Button';
import { ErrorBoundary } from '@repo/ui/ErrorBoundary';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const variants = ['destructive', 'primary', 'secondary', 'accent', 'outline', 'ghost'] as const;

function ErrorThrower({ message }: { message?: string }) {
  throw new Error(message ?? 'Simulated error for storybook demo');
  return null;
}

function ToggleError({ children }: { children: (throwIt: boolean) => React.ReactNode }) {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) return <>{children(true)}</>;

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-muted-foreground text-sm">Click the button to trigger an error.</p>
      <Button
        onClick={() => setShouldThrow(true)}
        variant="destructive"
        size="sm"
      >
        Trigger error
      </Button>
    </div>
  );
}

function ResettableDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [count, setCount] = useState(0);

  if (shouldThrow) throw new Error(`Attempt #${count + 1}`);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-muted-foreground text-sm">
        Click &ldquo;Try again&rdquo; on the fallback to recover.
      </p>
      <Button
        onClick={() => {
          setCount((c) => c + 1);
          setShouldThrow(true);
        }}
        variant="destructive"
        size="sm"
      >
        Trigger error
      </Button>
      <p className="text-muted-foreground text-xs">Attempts: {count}</p>
    </div>
  );
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants
    }
  }
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ToggleError>{(shouldThrow) => shouldThrow && <ErrorThrower />}</ToggleError>
    </ErrorBoundary>
  )
};

export const WithReset: Story = {
  render: () => (
    <ErrorBoundary>
      <ResettableDemo />
    </ErrorBoundary>
  )
};

export const PrimaryVariant: Story = {
  render: () => (
    <ErrorBoundary variant="primary">
      <ToggleError>
        {(shouldThrow) => shouldThrow && <ErrorThrower message="A less destructive error" />}
      </ToggleError>
    </ErrorBoundary>
  )
};

export const SecondaryVariant: Story = {
  render: () => (
    <ErrorBoundary variant="secondary">
      <ToggleError>
        {(shouldThrow) => shouldThrow && <ErrorThrower message="A secondary-styled error" />}
      </ToggleError>
    </ErrorBoundary>
  )
};

export const AccentVariant: Story = {
  render: () => (
    <ErrorBoundary variant="accent">
      <ToggleError>
        {(shouldThrow) => shouldThrow && <ErrorThrower message="An accent-styled error" />}
      </ToggleError>
    </ErrorBoundary>
  )
};

export const OutlineVariant: Story = {
  render: () => (
    <ErrorBoundary variant="outline">
      <ToggleError>
        {(shouldThrow) => shouldThrow && <ErrorThrower message="A subtle outlined error" />}
      </ToggleError>
    </ErrorBoundary>
  )
};

export const GhostVariant: Story = {
  render: () => (
    <ErrorBoundary variant="ghost">
      <ToggleError>
        {(shouldThrow) => shouldThrow && <ErrorThrower message="A subtle, quiet error" />}
      </ToggleError>
    </ErrorBoundary>
  )
};
