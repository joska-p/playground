import { Switch } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof Switch> = {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    checked: { control: 'boolean' }
  },
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Dark mode', defaultChecked: true }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch
        label="Default"
        variant="default"
        defaultChecked
      />
      <Switch
        label="Primary"
        variant="primary"
        defaultChecked
      />
      <Switch
        label="Secondary"
        variant="secondary"
      />
      <Switch
        label="Accent"
        variant="accent"
        defaultChecked
      />
      <Switch
        label="Warning"
        variant="warning"
      />
      <Switch
        label="Destructive"
        variant="destructive"
        defaultChecked
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Off" />
      <Switch
        label="On"
        defaultChecked
      />
      <Switch
        label="Loading"
        loading
        defaultChecked
      />
      <Switch
        label="Disabled checked"
        disabled
        checked
      />
      <Switch
        label="Disabled unchecked"
        disabled
      />
    </div>
  )
};

export const NoLabel: Story = {
  args: { defaultChecked: true }
};
