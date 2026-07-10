import { NotificationItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkles } from 'lucide-react';

const meta: Meta<typeof NotificationItem> = {
  title: 'Data Display/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    title: { control: 'text' },
    timestamp: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const Default: Story = {
  args: {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Experiment generated successfully',
    timestamp: '2 min ago'
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <NotificationItem
          key={variant}
          variant={variant}
          icon={<Sparkles className="h-4 w-4" />}
          title={variant}
          timestamp="Just now"
        />
      ))}
    </div>
  )
};
