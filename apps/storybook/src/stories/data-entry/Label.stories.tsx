import { Label } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
  title: 'Data Entry/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant of the label text.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the font size.',
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    },
    required: {
      description: 'Shows a colored asterisk after the label text.',
      control: 'boolean'
    },
    disabled: {
      description: 'Applies dimmed styling.',
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: 'Username' }
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Project Name' }
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Optional Notes' }
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'Promo Code' }
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Storage Limit' }
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Password' }
};

export const Required: Story = {
  args: { required: true, children: 'Email Address' }
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Read Only Field' }
};

export const Small: Story = {
  args: { size: 'sm', children: 'Filter by tag' }
};

export const Large: Story = {
  args: { size: 'lg', children: 'Section Title' }
};
