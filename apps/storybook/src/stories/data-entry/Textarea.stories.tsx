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

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Textarea
        variant="default"
        placeholder="Default\u2026"
      />
      <Textarea
        variant="primary"
        placeholder="Primary\u2026"
      />
      <Textarea
        variant="accent"
        placeholder="Accent\u2026"
      />
      <Textarea
        variant="destructive"
        placeholder="Destructive\u2026"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Textarea placeholder="Empty field\u2026" />
      <Textarea defaultValue="This field has content filled in." />
      <Textarea
        disabled
        value="This field is read only."
      />
    </div>
  )
};

export const WithoutAutoGrow: Story = {
  args: { autoGrow: false, rows: 4, placeholder: 'Fixed height textarea\u2026' }
};
