import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Data Entry/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'warning',
        'destructive',
        'ghost',
        'link',
        'outline'
      ],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'default', 'lg', 'icon'],
      control: { type: 'select' }
    },
    loading: { control: 'boolean' },
    tooltip: { control: 'text' },
    disabled: { control: 'boolean' },
    children: { control: 'text' }
  },
  args: {
    onClick: fn(),
    children: 'Button'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { variant: 'default', size: 'default' }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">★</Button>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button>Default</Button>
      <Button loading>Saving\u2026</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
};

export const Interaction: Story = {
  args: { variant: 'primary', children: 'Primary' },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  }
};
