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

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Slider
        variant="default"
        defaultValue={50}
      />
      <Slider
        variant="primary"
        defaultValue={50}
      />
      <Slider
        variant="accent"
        defaultValue={30}
      />
      <Slider
        variant="destructive"
        defaultValue={70}
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Slider defaultValue={50} />
      <Slider
        disabled
        defaultValue={40}
      />
    </div>
  )
};

export const WithoutTicks: Story = {
  args: { showTicks: false, defaultValue: 75 }
};

export const CustomRange: Story = {
  args: { min: 0, max: 255, defaultValue: 128 }
};
