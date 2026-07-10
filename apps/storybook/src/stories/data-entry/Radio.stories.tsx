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
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'outline'],
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
        name="group1"
      />
      <Radio
        label="Primary"
        variant="primary"
        name="group1"
        defaultChecked
      />
      <Radio
        label="Secondary"
        variant="secondary"
        name="group1"
      />
      <Radio
        label="Accent"
        variant="accent"
        name="group1"
      />
      <Radio
        label="Warning"
        variant="warning"
        name="group1"
      />
      <Radio
        label="Destructive"
        variant="destructive"
        name="group1"
      />
      <Radio
        label="Outline"
        variant="outline"
        name="group1"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio
        label="Unchecked"
        variant="warning"
      />
      <Radio
        label="Checked"
        defaultChecked
        variant="destructive"
      />
      <Radio
        label="Disabled unchecked"
        disabled
        variant="accent"
      />
      <Radio
        label="Disabled checked"
        disabled
        checked
        variant="default"
      />
    </div>
  )
};
