import { Badge } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content inside the badge.',
      control: 'text'
    },
    variant: {
      description: 'Visual style of the badge.',
      options: ['soft', 'solid', 'outline', 'dot'],
      control: { type: 'select' }
    },
    color: {
      description: 'CSS variable name for the accent color.',
      control: 'text'
    }
  },
  args: {
    children: 'Badge Text'
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'Stable'
  }
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'New',
    color: 'accent'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Beta'
  }
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    children: 'Online'
  }
};

export const AccentColor: Story = {
  args: {
    variant: 'solid',
    children: 'Featured',
    color: 'accent'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'soft',
    children: 'Deprecated',
    color: 'destructive'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'soft',
    children: 'Optional',
    color: 'secondary'
  }
};
