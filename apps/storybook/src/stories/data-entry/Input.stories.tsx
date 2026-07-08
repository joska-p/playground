import { Input } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeOff, Search } from 'lucide-react';
import { fn } from 'storybook/test';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      options: ['text', 'email', 'password', 'number', 'url', 'search'],
      control: { type: 'select' }
    },
    expandable: { control: 'boolean' }
  },
  args: {
    onChange: fn(),
    placeholder: 'Type something\u2026'
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {}
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input
        variant="default"
        placeholder="Default variant"
      />
      <Input
        variant="primary"
        placeholder="Primary variant"
      />
      <Input
        variant="accent"
        placeholder="Accent variant"
      />
      <Input
        variant="destructive"
        placeholder="Destructive variant"
        defaultValue="bad@input"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Default state" />
      <Input
        disabled
        placeholder="This field is locked"
        value="Read only content"
      />
    </div>
  )
};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Search className="h-4 w-4" />, placeholder: 'Search experiments\u2026' }
};

export const WithTrailingAction: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    trailingAction: <EyeOff className="h-4 w-4" />
  }
};

export const Expandable: Story = {
  args: { expandable: true, placeholder: 'Search\u2026' }
};
