import { ControlRow } from '@repo/ui/control-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlRow> = {
  title: 'Control Panel/ControlRow',
  component: ControlRow,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label for the control.',
      control: 'text'
    },
    value: {
      description: 'Optional live value readout shown next to the label.',
      control: 'text'
    },
    hint: {
      description: 'Tooltip text shown on label hover.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ControlRow>;

export const Default: Story = {
  args: {
    label: 'Brightness',
    value: '75',
    hint: 'Adjust the overall brightness',
    children: (
      <div className="h-2 rounded-full bg-gray-600">
        <div className="h-2 w-3/4 rounded-full bg-white" />
      </div>
    )
  }
};
