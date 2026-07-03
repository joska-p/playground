import { NotificationItem } from '@repo/ui/NotificationItem';
import { Icon } from '@repo/ui/Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof NotificationItem> = {
  title: 'Stylistic/Molecules/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    timestamp: { control: 'text' },
    icon: { control: false },
    iconColor: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Info: Story = {
  args: {
    icon: <Icon name="box" />,
    iconColor: 'bg-primary/15 text-primary',
    title: 'Experiment started',
    timestamp: '2 minutes ago'
  }
};

export const Success: Story = {
  args: {
    icon: <Icon name="sparkles" />,
    iconColor: 'bg-accent/15 text-accent',
    title: 'Render complete',
    timestamp: '5 minutes ago'
  }
};

export const Warning: Story = {
  args: {
    icon: <Icon name="close" />,
    iconColor: 'bg-warning/15 text-warning',
    title: 'High memory usage detected',
    timestamp: '1 hour ago'
  }
};

export const Error: Story = {
  args: {
    icon: <Icon name="close" />,
    iconColor: 'bg-destructive/15 text-destructive',
    title: 'Export failed',
    timestamp: '2 hours ago'
  }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <NotificationItem
        icon={<Icon name="sparkles" />}
        iconColor="bg-accent/15 text-accent"
        title="Render complete"
        timestamp="Just now"
      />
      <NotificationItem
        icon={<Icon name="box" />}
        iconColor="bg-primary/15 text-primary"
        title="Project saved"
        timestamp="1 minute ago"
      />
      <NotificationItem
        icon={<Icon name="close" />}
        iconColor="bg-destructive/15 text-destructive"
        title="Connection lost"
        timestamp="5 minutes ago"
      />
    </div>
  )
};
