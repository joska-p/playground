import { NotificationItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, CheckCircle2, Sparkles, XCircle } from 'lucide-react';

const meta: Meta<typeof NotificationItem> = {
  title: 'Data Display/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color driving the icon background.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    title: {
      description: 'Main notification text.',
      control: 'text'
    },
    timestamp: {
      description: 'Time display shown below the title.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Info: Story = {
  args: {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Experiment generated successfully',
    timestamp: '2 min ago'
  }
};

export const Success: Story = {
  args: {
    variant: 'secondary',
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: 'Preset saved to library',
    timestamp: '1 hour ago'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <AlertTriangle className="h-4 w-4" />,
    title: 'Render quality reduced — memory limit reached',
    timestamp: '5 min ago'
  }
};

export const Error: Story = {
  args: {
    variant: 'destructive',
    icon: <XCircle className="h-4 w-4" />,
    title: 'Failed to export project',
    timestamp: 'Just now'
  }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NotificationItem
        icon={<CheckCircle2 className="h-4 w-4" />}
        variant="secondary"
        title="Export complete"
        timestamp="1 min ago"
      />
      <NotificationItem
        icon={<AlertTriangle className="h-4 w-4" />}
        variant="warning"
        title="Disk space below 10%"
        timestamp="5 min ago"
      />
      <NotificationItem
        icon={<XCircle className="h-4 w-4" />}
        variant="destructive"
        title="Connection lost"
        timestamp="10 min ago"
      />
    </div>
  )
};
