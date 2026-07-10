import { Popover } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Popover> = {
  title: 'Data Display/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    align: {
      options: ['left', 'center'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Popover>;

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const Default: Story = {
  args: {
    variant: 'default',
    trigger: <Button>Hover me</Button>,
    children: <p className="text-sm">Popover content goes here.</p>
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-8 px-4 pt-48">
      {VARIANTS.map((variant) => (
        <Popover
          key={variant}
          variant={variant}
          trigger={<Button variant={variant}>{variant}</Button>}
        >
          <p className="text-sm font-medium">{variant}</p>
          <p className="text-foreground-muted text-xs">Content for {variant} variant.</p>
        </Popover>
      ))}
    </div>
  )
};

export const LongTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-8 px-4 pt-48">
      <Popover
        variant="primary"
        trigger={<Button variant="primary">primary</Button>}
      >
        <p className="text-sm font-medium">About this parameter</p>
        <p className="text-foreground-muted text-xs leading-relaxed">
          Controls the base frequency of the noise function used to generate the terrain heightmap.
          Higher values produce more detailed, rougher surfaces while lower values create smoother,
          rolling landscapes.
        </p>
      </Popover>
    </div>
  )
};
