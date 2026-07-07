import { Alert } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the alert.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    title: {
      description: 'Main alert message.',
      control: 'text'
    },
    description: {
      description: 'Optional supporting details.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Heads up!',
    description: 'This is a default alert with contextual information.'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Update available',
    description: 'A new version of the library is ready to install.'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Operation complete',
    description: 'Your export has been processed successfully.'
  }
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    title: 'Pro tip',
    description: 'Use keyboard shortcuts to speed up your workflow.'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error saving file',
    description: 'The server returned a 500 error. Please try again.'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Storage nearly full',
    description: 'You are using 95% of your available storage.'
  }
};

export const TitleOnly: Story = {
  args: {
    variant: 'primary',
    title: 'Short notice'
  }
};
