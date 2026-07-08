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

export const VariantPrimary: Story = {
  args: { variant: 'primary', children: 'Primary' },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  }
};

export const VariantSecondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' }
};

export const VariantAccent: Story = {
  args: { variant: 'accent', children: 'Accent' }
};

export const VariantDestructive: Story = {
  args: { variant: 'destructive', children: 'Delete' }
};

export const VariantWarning: Story = {
  args: { variant: 'warning', children: 'Warning' }
};

export const VariantGhost: Story = {
  args: { variant: 'ghost', children: 'Ghost' }
};

export const VariantOutline: Story = {
  args: { variant: 'outline', children: 'Outline' }
};

export const VariantLink: Story = {
  args: { variant: 'link', children: 'Link' }
};

export const SizeSm: Story = {
  args: { size: 'sm', children: 'Small' }
};

export const SizeLg: Story = {
  args: { size: 'lg', children: 'Large' }
};

export const SizeIcon: Story = {
  args: { size: 'icon', children: '★' }
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving\u2026' }
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' }
};
