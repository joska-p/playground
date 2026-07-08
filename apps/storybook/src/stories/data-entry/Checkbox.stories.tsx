import { Checkbox } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Enable notifications', defaultChecked: true }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Default"
        variant="default"
        defaultChecked
      />
      <Checkbox
        label="Primary"
        variant="primary"
        defaultChecked
      />
      <Checkbox
        label="Accent"
        variant="accent"
        defaultChecked
      />
      <Checkbox
        label="Destructive"
        variant="destructive"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox
        label="Checked"
        defaultChecked
      />
      <Checkbox
        label="Disabled checked"
        disabled
        checked
      />
      <Checkbox
        label="Disabled unchecked"
        disabled
      />
    </div>
  )
};

export const NoLabel: Story = {
  args: { defaultChecked: true }
};
