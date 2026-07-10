import { Popover } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Popover> = {
  title: 'Data Display/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Top accent strip color.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    align: {
      description: 'Horizontal alignment relative to trigger.',
      options: ['left', 'center'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    variant: 'default',
    trigger: <Button>Hover me</Button>,
    children: <p className="text-sm">Popover content goes here.</p>
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    trigger: <Button variant="primary">Info</Button>,
    children: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Keyboard Shortcuts</p>
        <p className="text-foreground-muted text-xs">Ctrl+Space to toggle the panel</p>
      </div>
    )
  }
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    trigger: <Button variant="accent">Tip</Button>,
    children: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Pro Tip</p>
        <p className="text-foreground-muted text-xs">
          You can drag and drop assets directly onto the canvas.
        </p>
      </div>
    )
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    trigger: <Button variant="destructive">Warning</Button>,
    children: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Unsaved Changes</p>
        <p className="text-foreground-muted text-xs">
          Your current experiment has unsaved modifications.
        </p>
      </div>
    )
  }
};

export const LongTooltip: Story = {
  args: {
    variant: 'default',
    widthClassName: 'w-72',
    trigger: <Button>More info</Button>,
    children: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">About this parameter</p>
        <p className="text-foreground-muted text-xs leading-relaxed">
          Controls the base frequency of the noise function used to generate the terrain heightmap.
          Higher values produce more detailed, rougher surfaces while lower values create smoother,
          rolling landscapes.
        </p>
      </div>
    )
  }
};
