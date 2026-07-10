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
  args: { label: 'Enable notifications' }
};

export const Variants: Story = {
  render: () => (
    <div className="flex justify-between gap-4">
      {(
        [
          'default',
          'primary',
          'secondary',
          'accent',
          'warning',
          'destructive',
          'ghost',
          'outline'
        ] as const
      ).map((variant) => (
        <Checkbox
          key={variant}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
          variant={variant}
          defaultChecked
        />
      ))}
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex justify-between gap-4">
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
