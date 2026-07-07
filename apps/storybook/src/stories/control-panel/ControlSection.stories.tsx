import { ControlSection } from '@repo/ui/control-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlSection> = {
  title: 'Control Panel/ControlSection',
  component: ControlSection,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Section heading text.',
      control: 'text'
    },
    variant: {
      description: 'Accent color for the chevron.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    defaultOpen: {
      description: 'Whether the section starts open.',
      control: 'boolean'
    }
  },
  args: {
    title: 'Transform',
    children: <p className="text-foreground-muted text-xs">Section content goes here.</p>
  }
};

export default meta;

type Story = StoryObj<typeof ControlSection>;

export const Default: Story = {
  args: { variant: 'default' }
};
