import { ControlSubsection } from '@repo/ui/control-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlSubsection> = {
  title: 'Control Panel/ControlSubsection',
  component: ControlSubsection,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Heading for the subsection.',
      control: 'text'
    },
    defaultOpen: {
      description: 'Whether the subsection starts open.',
      control: 'boolean'
    }
  },
  args: {
    title: 'Advanced'
  }
};

export default meta;

type Story = StoryObj<typeof ControlSubsection>;

export const Default: Story = {
  args: {
    children: <p className="text-foreground-muted text-xs">Nested controls appear here.</p>
  }
};
