import { Badge } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      description: 'Visual style of the badge.',
      options: ['soft', 'solid', 'outline'],
      control: { type: 'select' }
    },
    variant: {
      description: 'Color token that drives the badge accent.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    dot: {
      description: 'Renders as a dot indicator instead of a label.',
      control: 'boolean'
    },
    children: {
      description: 'Content inside the badge.',
      control: 'text'
    }
  },
  args: {
    children: 'Badge'
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { appearance: 'soft', children: 'Stable' }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          appearance="soft"
          variant="default"
        >
          Default
        </Badge>
        <Badge
          appearance="soft"
          variant="primary"
        >
          Primary
        </Badge>
        <Badge
          appearance="soft"
          variant="secondary"
        >
          Secondary
        </Badge>
        <Badge
          appearance="soft"
          variant="accent"
        >
          Accent
        </Badge>
        <Badge
          appearance="soft"
          variant="warning"
        >
          Warning
        </Badge>
        <Badge
          appearance="soft"
          variant="destructive"
        >
          Destructive
        </Badge>
        <Badge
          appearance="soft"
          variant="ghost"
        >
          Ghost
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          appearance="solid"
          variant="default"
        >
          Default
        </Badge>
        <Badge
          appearance="solid"
          variant="primary"
        >
          Primary
        </Badge>
        <Badge
          appearance="solid"
          variant="secondary"
        >
          Secondary
        </Badge>
        <Badge
          appearance="solid"
          variant="accent"
        >
          Accent
        </Badge>
        <Badge
          appearance="solid"
          variant="warning"
        >
          Warning
        </Badge>
        <Badge
          appearance="solid"
          variant="destructive"
        >
          Destructive
        </Badge>
        <Badge
          appearance="solid"
          variant="ghost"
        >
          Ghost
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          appearance="outline"
          variant="default"
        >
          Default
        </Badge>
        <Badge
          appearance="outline"
          variant="primary"
        >
          Primary
        </Badge>
        <Badge
          appearance="outline"
          variant="secondary"
        >
          Secondary
        </Badge>
        <Badge
          appearance="outline"
          variant="accent"
        >
          Accent
        </Badge>
        <Badge
          appearance="outline"
          variant="warning"
        >
          Warning
        </Badge>
        <Badge
          appearance="outline"
          variant="destructive"
        >
          Destructive
        </Badge>
        <Badge
          appearance="outline"
          variant="ghost"
        >
          Ghost
        </Badge>
      </div>
    </div>
  )
};

export const Dot: Story = {
  args: { dot: true, children: 'Online' }
};
