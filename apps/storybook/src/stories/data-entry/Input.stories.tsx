import { Input } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { fn } from 'storybook/test';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'warning',
        'destructive',
        'ghost',
        'outline'
      ],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'select' }
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      options: ['text', 'email', 'password', 'number', 'url', 'search'],
      control: { type: 'select' }
    }
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

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input
        size="sm"
        placeholder="Small input"
      />
      <Input
        size="default"
        placeholder="Default input"
      />
      <Input
        size="lg"
        placeholder="Large input"
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
      <Input
        loading
        placeholder="Loading state"
      />
    </div>
  )
};

export const WithLeadingIcon: Story = {
  args: { icon: <Search className="h-4 w-4" />, placeholder: 'Search experiments\u2026' }
};
