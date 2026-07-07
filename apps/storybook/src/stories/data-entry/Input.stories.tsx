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
      description: 'Focus-ring color token.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    placeholder: {
      description: 'Placeholder text inside the input.',
      control: 'text'
    },
    disabled: {
      description: 'Disables interaction and dims the appearance.',
      control: 'boolean'
    },
    type: {
      description: 'HTML input type.',
      options: ['text', 'email', 'password', 'number', 'url', 'search'],
      control: { type: 'select' }
    },
    expandable: {
      description: 'Expands on focus via CSS transition.',
      control: 'boolean'
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
  args: { variant: 'default' }
};

export const Primary: Story = {
  args: { variant: 'primary', placeholder: 'Enter your name' }
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

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'This field is locked', value: 'Read only content' }
};

export const Expandable: Story = {
  args: { expandable: true, placeholder: 'Search\u2026' }
};
