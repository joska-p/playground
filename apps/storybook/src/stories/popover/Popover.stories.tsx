import { Popover } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: {
      description: 'The side of the trigger where the popover appears.',
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' }
    },
    variant: {
      description: 'Visual style variant.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Top: Story = {
  args: {
    side: 'top',
    variant: 'default'
  },
  render: (args) => (
    <div className="flex min-h-48 items-center justify-center">
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Hover me</Button>
        </Popover.Trigger>
        <Popover.Content
          side={args.side}
          variant={args.variant}
        >
          <div className="px-3 py-2 whitespace-nowrap">
            <p className="text-sm font-medium">Popover Title</p>
            <p className="text-muted-foreground text-xs">And a short description here.</p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
};

export const Bottom: Story = {
  args: {
    side: 'bottom'
  },
  render: (args) => (
    <div className="flex min-h-48 items-center justify-center">
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Hover for details</Button>
        </Popover.Trigger>
        <Popover.Content
          side={args.side}
          variant={args.variant}
        >
          <div className="px-3 py-2 whitespace-nowrap">
            <p className="text-sm font-medium">Settings</p>
            <p className="text-muted-foreground text-xs">Adjust your preferences here.</p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
};

export const Left: Story = {
  args: {
    side: 'left'
  },
  render: (args) => (
    <div className="flex min-h-48 items-center justify-center">
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Hover me</Button>
        </Popover.Trigger>
        <Popover.Content
          side={args.side}
          variant={args.variant}
        >
          <div className="px-3 py-2 whitespace-nowrap">
            <p className="text-sm font-medium">Info</p>
            <p className="text-muted-foreground text-xs">Additional context on the left.</p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
};

export const Right: Story = {
  args: {
    side: 'right'
  },
  render: (args) => (
    <div className="flex min-h-48 items-center justify-center">
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Hover me</Button>
        </Popover.Trigger>
        <Popover.Content
          side={args.side}
          variant={args.variant}
        >
          <div className="px-3 py-2 whitespace-nowrap">
            <p className="text-sm font-medium">Details</p>
            <p className="text-muted-foreground text-xs">More information on the right.</p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
};
