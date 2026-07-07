import { Checkbox } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the checkbox.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Text label displayed next to the checkbox.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    },
    checked: {
      description: 'Controlled checked state.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { label: 'Enable notifications' }
};

export const Checked: Story = {
  args: { label: 'Enable notifications', defaultChecked: true }
};

export const Primary: Story = {
  args: { variant: 'primary', label: 'Primary option', defaultChecked: true }
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary option' }
};

export const Accent: Story = {
  args: { variant: 'accent', label: 'Accent option', defaultChecked: true }
};

export const Destructive: Story = {
  args: { variant: 'destructive', label: 'Destructive action' }
};

export const DisabledChecked: Story = {
  args: { disabled: true, label: 'Read only setting', checked: true }
};

export const DisabledUnchecked: Story = {
  args: { disabled: true, label: 'Locked preference' }
};

export const NoLabel: Story = {
  args: {}
};
