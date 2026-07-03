import { ColorSwatch } from '@repo/ui/ColorSwatch';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Stylistic/Atoms/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'CSS color value for the swatch.',
      control: 'color'
    },
    name: {
      description: 'Display name of the color.',
      control: 'text'
    },
    token: {
      description: 'CSS variable token name.',
      control: 'text'
    },
    size: {
      description: 'Controls the swatch size.',
      options: ['sm', 'md'],
      control: { type: 'select' }
    }
  },
  args: {
    color: '#458588'
  }
};

export default meta;

type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {
  args: {
    color: '#458588',
    name: 'Primary Blue',
    token: '--primary'
  }
};

export const WithToken: Story = {
  args: {
    color: '#98971a',
    name: 'Accent Green',
    token: '--accent'
  }
};

export const Small: Story = {
  args: {
    color: '#cc241d',
    name: 'Destructive Red',
    token: '--destructive',
    size: 'sm'
  }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ColorSwatch
        color="#458588"
        name="Primary"
        token="--primary"
      />
      <ColorSwatch
        color="#98971a"
        name="Accent"
        token="--accent"
      />
      <ColorSwatch
        color="#cc241d"
        name="Destructive"
        token="--destructive"
      />
      <ColorSwatch
        color="#d79921"
        name="Warning"
        token="--warning"
      />
      <ColorSwatch
        color="#282828"
        name="Background"
        token="--background"
      />
    </div>
  )
};
