import { Slider } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Slider> = {
  title: 'Data Entry/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    showTicks: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: 50 }
};

export const VariantDefault: Story = {
  args: { variant: 'default', defaultValue: 50 }
};

export const VariantAccent: Story = {
  args: { variant: 'accent', defaultValue: 30 }
};

export const VariantDestructive: Story = {
  args: { variant: 'destructive', defaultValue: 70 }
};

export const WithoutTicks: Story = {
  args: { showTicks: false, defaultValue: 75 }
};

export const CustomRange: Story = {
  args: { min: 0, max: 255, defaultValue: 128 }
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 40 }
};
