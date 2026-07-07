import { Button } from '@repo/ui/data-entry';
import { ErrorBoundary } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

function ThrowOnRender() {
  throw new Error('Something went wrong while rendering this component.');
}

function RiskyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Intentional error triggered by the user.');
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <p className="text-foreground-muted text-sm">This component is working normally.</p>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          setShouldThrow(true);
        }}
      >
        Trigger Error
      </Button>
    </div>
  );
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant passed to the default fallback.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowOnRender />
    </ErrorBoundary>
  )
};

export const WithReset: Story = {
  render: () => <RiskyComponent />
};

export const PrimaryVariant: Story = {
  args: { variant: 'primary' },
  render: (args) => (
    <ErrorBoundary {...args}>
      <ThrowOnRender />
    </ErrorBoundary>
  )
};

export const AccentVariant: Story = {
  args: { variant: 'accent' },
  render: (args) => (
    <ErrorBoundary {...args}>
      <ThrowOnRender />
    </ErrorBoundary>
  )
};
