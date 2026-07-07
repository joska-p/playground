import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Data Entry/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the button.',
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'warning',
        'destructive',
        'ghost',
        'link'
      ],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the physical dimensions.',
      options: ['sm', 'default', 'lg', 'icon'],
      control: { type: 'select' }
    },
    loading: {
      description: 'Shows a loading spinner and disables the button.',
      control: 'boolean'
    },
    tooltip: {
      description: 'Native title text shown on hover.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    },
    children: {
      description: 'Content inside the button.',
      control: 'text'
    }
  },
  args: {
    onClick: fn(),
    children: 'Button'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { variant: 'default' }
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  }
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' }
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'Accent' }
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' }
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' }
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' }
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' }
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving\u2026' }
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' }
};
