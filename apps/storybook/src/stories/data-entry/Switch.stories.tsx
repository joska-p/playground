import { Switch } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Switch> = {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the switch toggle.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Text label displayed next to the switch.',
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

type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  args: { label: 'Dark mode' }
};

export const On: Story = {
  args: { label: 'Dark mode', defaultChecked: true }
};

export const Primary: Story = {
  args: { variant: 'primary', label: 'Enable notifications', defaultChecked: true }
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Reduce motion' }
};

export const Accent: Story = {
  args: { variant: 'accent', label: 'High contrast mode', defaultChecked: true }
};

export const Destructive: Story = {
  args: { variant: 'destructive', label: 'Experimental features' }
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Auto-save', checked: true }
};
