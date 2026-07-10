import { SectionHeading } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionHeading> = {
  title: 'Data Display/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    label: 'Getting Started',
    title: 'Welcome to the Platform',
    description: 'This section provides an overview of the platform and its core features.',
    variant: 'default'
  }
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary'
  }
};

export const Accent: Story = {
  args: {
    ...Default.args,
    variant: 'accent'
  }
};

export const Warning: Story = {
  args: {
    ...Default.args,
    variant: 'warning'
  }
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive'
  }
};
