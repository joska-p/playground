import { Button } from '@repo/ui/data-entry';
import { Icon } from '@repo/ui/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { fn } from 'storybook/test';

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
        'outline',
        'link'
      ],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'icon'],
      control: { type: 'select' }
    },
    loading: { control: 'boolean' },
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
  args: { variant: 'default', size: 'md' }
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
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>

      <Button
        variant="primary"
        style={
          {
            '--primary': '#251452',
            '--primary-foreground': '#fff'
          } as CSSProperties
        }
      >
        Custom with style
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        icon
        <Icon name="bluesky" />
      </Button>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
};
