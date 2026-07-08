import { Radio } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Radio> = {
  title: 'Data Entry/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the radio button.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Text label displayed next to the radio.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    },
    checked: {
      description: 'Controlled checked state.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: 'Standard', defaultChecked: true }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio
        label="Default"
        variant="default"
        defaultChecked
      />
      <Radio
        label="Primary"
        variant="primary"
        defaultChecked
      />
      <Radio
        label="Secondary"
        variant="secondary"
      />
      <Radio
        label="Accent"
        variant="accent"
        defaultChecked
      />
      <Radio
        label="Warning"
        variant="warning"
      />
      <Radio
        label="Destructive"
        variant="destructive"
      />
      <Radio
        label="Ghost"
        variant="ghost"
        defaultChecked
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio label="Unchecked" />
      <Radio
        label="Checked"
        defaultChecked
      />
      <Radio
        label="Disabled unchecked"
        disabled
      />
      <Radio
        label="Disabled checked"
        disabled
        checked
      />
    </div>
  )
};

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio
        label="Basic"
        name="group"
        defaultChecked
      />
      <Radio
        label="Standard"
        name="group"
      />
      <Radio
        label="Premium"
        name="group"
      />
    </div>
  )
};
