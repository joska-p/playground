import { Radio } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Radio> = {
  title: 'Data Entry/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the radio button.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Text label displayed next to the radio.',
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

type Story = StoryObj<typeof Radio>;

export const Unchecked: Story = {
  args: { label: 'Standard' }
};

export const Checked: Story = {
  args: { label: 'Standard', defaultChecked: true }
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
  args: { variant: 'destructive', label: 'Destructive option' }
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable choice', checked: true }
};
