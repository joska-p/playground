import { ColorPalette } from '@repo/ui/widgets';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const gruvboxColors = ['#fb4934', '#fabd2f', '#b8bb26', '#83a598', '#d3869b', '#8ec07c'];
const nordColors = ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead', '#88c0d0'];
const catppuccinColors = ['#f38ba8', '#fab387', '#f9e2af', '#a6e3a1', '#cba6f7', '#94e2d5'];

const meta: Meta<typeof ColorPalette> = {
  title: 'Widgets/ColorPalette',
  component: ColorPalette,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color for the selected state indicator.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    name: {
      description: 'Radio group name.',
      control: 'text'
    },
    colors: {
      description: 'Array of CSS color strings.',
      control: 'object'
    },
    checked: {
      description: 'Controlled checked state.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn(),
    name: 'palette'
  }
};

export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const PrimaryHorizontal: Story = {
  args: {
    colors: gruvboxColors,
    variant: 'primary',
    checked: true
  }
};

export const SecondaryVertical: Story = {
  args: {
    colors: nordColors,
    variant: 'secondary'
  }
};

export const AccentLarge: Story = {
  args: {
    colors: catppuccinColors,
    variant: 'accent',
    checked: true
  }
};

export const SmallCompact: Story = {
  args: {
    colors: gruvboxColors,
    variant: 'primary'
  }
};
