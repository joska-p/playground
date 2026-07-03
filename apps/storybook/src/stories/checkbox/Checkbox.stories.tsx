import { Checkbox } from '@repo/ui/Checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Controls the checked state accent color.',
      options: ['primary', 'secondary', 'accent', 'destructive', 'warning', 'outline'],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the physical size of the checkbox.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    disabled: {
      description: 'Disables user interaction.',
      control: 'boolean'
    },
    defaultChecked: {
      description: 'Whether the checkbox is checked by default.',
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

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

export const DisabledChecked: Story = {
  args: {
    variant: 'primary',
    defaultChecked: true,
    disabled: true
  }
};

export const DisabledUnchecked: Story = {
  args: {
    variant: 'primary',
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
