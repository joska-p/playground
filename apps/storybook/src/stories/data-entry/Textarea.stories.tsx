import { Textarea } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Textarea> = {
  title: 'Data Entry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Focus-ring color token.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    placeholder: {
      description: 'Placeholder text inside the textarea.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    },
    autoGrow: {
      description: 'Auto-grows with content via CSS field-sizing.',
      control: 'boolean'
    },
    rows: {
      description: 'Number of visible text rows.',
      control: 'number'
    }
  },
  args: {
    onChange: fn(),
    placeholder: 'Write something\u2026'
  }
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { variant: 'default' }
};

export const Primary: Story = {
  args: { variant: 'primary', placeholder: 'Describe your experiment\u2026' }
};

export const WithValue: Story = {
  args: {
    defaultValue:
      'This is a longer piece of content that demonstrates how the textarea handles multiple lines of text in its natural state.'
  }
};

export const WithoutAutoGrow: Story = {
  args: { autoGrow: false, rows: 4, placeholder: 'Fixed height textarea\u2026' }
};

export const Disabled: Story = {
  args: { disabled: true, value: 'This field is read only.' }
};
