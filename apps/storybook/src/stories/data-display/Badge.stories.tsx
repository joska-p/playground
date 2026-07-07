import { Badge } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      description: 'Visual style of the badge.',
      options: ['soft', 'solid', 'outline'],
      control: { type: 'select' }
    },
    variant: {
      description: 'Color token that drives the badge accent.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    dot: {
      description: 'Renders as a dot indicator instead of a label.',
      control: 'boolean'
    },
    children: {
      description: 'Content inside the badge.',
      control: 'text'
    }
  },
  args: {
    children: 'Badge'
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Soft: Story = {
  args: { appearance: 'soft', children: 'Stable' }
};

export const Solid: Story = {
  args: { appearance: 'solid', children: 'New' }
};

export const Outline: Story = {
  args: { appearance: 'outline', children: 'Beta' }
};

export const Dot: Story = {
  args: { dot: true, children: 'Online' }
};

export const AccentColor: Story = {
  args: { appearance: 'solid', variant: 'accent', children: 'Featured' }
};

export const Destructive: Story = {
  args: { appearance: 'soft', variant: 'destructive', children: 'Deprecated' }
};

export const Secondary: Story = {
  args: { appearance: 'soft', variant: 'secondary', children: 'Optional' }
};
