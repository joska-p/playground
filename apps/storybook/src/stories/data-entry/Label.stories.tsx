import { Label } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
  title: 'Data Entry/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: 'Username' }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label variant="default">Default</Label>
      <Label variant="primary">Primary</Label>
      <Label variant="secondary">Secondary</Label>
      <Label variant="accent">Accent</Label>
      <Label variant="warning">Warning</Label>
      <Label variant="destructive">Destructive</Label>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Label size="sm">Small</Label>
      <Label size="default">Default</Label>
      <Label size="lg">Large</Label>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label>Default</Label>
      <Label required>Required</Label>
      <Label disabled>Disabled</Label>
      <Label
        required
        disabled
      >
        Required &amp; disabled
      </Label>
    </div>
  )
};
