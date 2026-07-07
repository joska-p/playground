import { Tooltip } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'Text shown in the tooltip bubble.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const OnButton: Story = {
  args: {
    content: 'Saves your current changes',
    children: <Button variant="primary">Save</Button>
  }
};

export const LongTooltip: Story = {
  args: {
    content: 'Applies the selected style to all matching elements in the current project',
    children: <Button variant="ghost">Apply</Button>
  }
};
