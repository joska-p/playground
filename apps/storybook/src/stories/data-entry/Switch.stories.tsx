import { Switch } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Switch> = {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Dark mode', defaultChecked: true }
};

export const Off: Story = {
  args: { label: 'Dark mode' }
};

export const VariantPrimary: Story = {
  args: { variant: 'primary', label: 'Enable notifications', defaultChecked: true }
};

export const VariantSecondary: Story = {
  args: { variant: 'secondary', label: 'Reduce motion' }
};

export const VariantAccent: Story = {
  args: { variant: 'accent', label: 'High contrast mode', defaultChecked: true }
};

export const VariantDestructive: Story = {
  args: { variant: 'destructive', label: 'Experimental features' }
};

export const VariantWarning: Story = {
  args: { variant: 'warning', label: 'Sensitive mode' }
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Auto-save', checked: true }
};
