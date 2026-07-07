import { ColorSwatch } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Data Display/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'CSS color value for the swatch box.',
      control: 'color'
    },
    name: {
      description: 'Display name of the color.',
      control: 'text'
    },
    token: {
      description: 'CSS variable token name (shown below the name).',
      control: 'text'
    },
    size: {
      description: 'Controls the swatch box dimensions.',
      options: ['sm', 'md'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {
  args: { color: '#d3869b', name: 'Pink', token: '--pink' }
};

export const WithToken: Story = {
  args: { color: '#8ec07c', name: 'Green', token: '--green' }
};

export const Small: Story = {
  args: { color: '#83a598', name: 'Blue', size: 'sm', token: '--blue' }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ColorSwatch
        color="#fb4934"
        name="Red"
        token="--red"
      />
      <ColorSwatch
        color="#fabd2f"
        name="Yellow"
        token="--yellow"
      />
      <ColorSwatch
        color="#83a598"
        name="Blue"
        token="--blue"
      />
      <ColorSwatch
        color="#8ec07c"
        name="Green"
        token="--green"
      />
      <ColorSwatch
        color="#d3869b"
        name="Purple"
        token="--purple"
      />
    </div>
  )
};
