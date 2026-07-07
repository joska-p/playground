import { Slider } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Slider> = {
  title: 'Data Entry/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the slider track.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    showTicks: {
      description: 'Show min/mid/max tick labels beneath the track.',
      control: 'boolean'
    },
    min: {
      description: 'Minimum value.',
      control: 'number'
    },
    max: {
      description: 'Maximum value.',
      control: 'number'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { variant: 'default' }
};

export const Primary: Story = {
  args: { variant: 'primary', defaultValue: 50 }
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
