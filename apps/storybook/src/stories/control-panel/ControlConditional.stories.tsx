import { ControlConditional } from '@repo/ui/control-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlConditional> = {
  title: 'Control Panel/ControlConditional',
  component: ControlConditional,
  tags: ['autodocs'],
  argTypes: {
    when: {
      description:
        'When true, children are visible. When false, children are hidden with animation.',
      control: 'boolean'
    }
  },
  args: {
    when: true
  }
};

export default meta;

type Story = StoryObj<typeof ControlConditional>;

export const Visible: Story = {
  args: {
    when: true,
    children: (
      <div className="text-foreground-muted rounded border p-3 text-xs">
        This content is visible.
      </div>
    )
  }
};

export const Hidden: Story = {
  args: {
    when: false,
    children: (
      <div className="text-foreground-muted rounded border p-3 text-xs">
        This content is hidden.
      </div>
    )
  }
};
