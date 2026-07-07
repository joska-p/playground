import { ControlGrid } from '@repo/ui/control-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlGrid> = {
  title: 'Control Panel/ControlGrid',
  component: ControlGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Number of grid columns.',
      options: [2, 3, 4],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ControlGrid>;

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: [1, 2, 3].map((i) => (
      <div
        key={i}
        className="text-foreground-muted flex aspect-square items-center justify-center rounded border text-xs"
      >
        {i}
      </div>
    ))
  }
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: [1, 2].map((i) => (
      <div
        key={i}
        className="text-foreground-muted flex aspect-square items-center justify-center rounded border text-xs"
      >
        {i}
      </div>
    ))
  }
};
