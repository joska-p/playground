import { DefaultFallback } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const error = new Error('Failed to load experiment assets from the remote server.');

const meta: Meta<typeof DefaultFallback> = {
  title: 'Feedback/DefaultFallback',
  component: DefaultFallback,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant of the fallback UI.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    title: {
      description: 'Override the default title text.',
      control: 'text'
    },
    description: {
      description: 'Override the default error message.',
      control: 'text'
    },
    resetLabel: {
      description: 'Label for the recovery button.',
      control: 'text'
    }
  },
  args: {
    error,
    reset: fn()
  }
};

export default meta;

type Story = StoryObj<typeof DefaultFallback>;

export const Default: Story = {
  args: { variant: 'destructive' }
};

export const WithReset: Story = {
  args: {
    variant: 'destructive',
    title: 'Connection lost',
    description: 'Check your network connection and try again.',
    resetLabel: 'Reconnect'
  }
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    title: 'Update required',
    description: 'Please refresh the page to get the latest version.'
  }
};

export const WarningVariant: Story = {
  args: {
    variant: 'warning',
    title: 'Deprecated feature',
    description: 'This API endpoint will be removed in the next release.'
  }
};
