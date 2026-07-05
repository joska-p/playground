import { Radio } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Controls the checked state accent color.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the physical size of the radio.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    disabled: {
      description: 'Disables user interaction.',
      control: 'boolean'
    },
    defaultChecked: {
      description: 'Whether the radio is checked by default.',
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    variant: 'default',
    defaultChecked: true
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    defaultChecked: true
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    defaultChecked: true
  }
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    defaultChecked: true
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    defaultChecked: true
  }
};

export const Unchecked: Story = {
  args: {
    variant: 'primary'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    defaultChecked: true,
    disabled: true
  }
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    defaultChecked: true
  }
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    defaultChecked: true
  }
};
