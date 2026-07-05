import { Alert } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the alert.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>This is a default alert with an icon.</Alert.Description>
      </div>
    </Alert>
  )
};

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>Your changes have been saved successfully.</Alert.Description>
      </div>
    </Alert>
  )
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Tip</Alert.Title>
        <Alert.Description>You can use keyboard shortcuts for faster navigation.</Alert.Description>
      </div>
    </Alert>
  )
};

export const Accent: Story = {
  args: {
    variant: 'accent'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Featured</Alert.Title>
        <Alert.Description>Check out the new experimental features!</Alert.Description>
      </div>
    </Alert>
  )
};

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong. Please try again later.</Alert.Description>
      </div>
    </Alert>
  )
};

export const Warning: Story = {
  args: {
    variant: 'warning'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <div>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>This action cannot be undone. Proceed with caution.</Alert.Description>
      </div>
    </Alert>
  )
};

export const TitleOnly: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <Alert.Title>Short notice</Alert.Title>
    </Alert>
  )
};
