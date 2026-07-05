import { Tooltip } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'The text displayed inside the tooltip.',
      control: 'text'
    },
    variant: {
      description: 'Visual style of the tooltip.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    variant: 'default'
  },
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    </div>
  )
};

export const Primary: Story = {
  args: {
    content: 'Primary styled tooltip',
    variant: 'primary'
  },
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    </div>
  )
};

export const Accent: Story = {
  args: {
    content: 'Accent styled tooltip',
    variant: 'accent'
  },
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    </div>
  )
};

export const Destructive: Story = {
  args: {
    content: 'Destructive action',
    variant: 'destructive'
  },
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <Button variant="outline">Delete</Button>
      </Tooltip>
    </div>
  )
};

export const LongTooltip: Story = {
  args: {
    content: 'This is a much longer tooltip with more explanation text',
    variant: 'default'
  },
  render: (args) => (
    <div className="flex min-h-32 items-center justify-center">
      <Tooltip {...args}>
        <span className="text-muted-foreground cursor-pointer text-sm underline decoration-dotted">
          Hover for details
        </span>
      </Tooltip>
    </div>
  )
};
