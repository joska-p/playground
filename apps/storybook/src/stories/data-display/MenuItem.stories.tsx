import { MenuItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogOut, Settings, User } from 'lucide-react';
import { fn } from 'storybook/test';

const meta: Meta<typeof MenuItem> = {
  title: 'Data Display/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const Default: Story = {
  args: { label: 'Profile', icon: <User className="h-4 w-4" /> }
};

export const Variants: Story = {
  render: () => (
    <div className="w-48 rounded-lg border p-1 shadow-sm">
      {VARIANTS.map((variant) => (
        <MenuItem
          key={variant}
          variant={variant}
          label={variant}
          icon={<Settings className="h-4 w-4" />}
        />
      ))}
    </div>
  )
};

export const State: Story = {
  render: () => (
    <div className="w-48 rounded-lg border p-1 shadow-sm">
      <MenuItem
        label="destructive"
        icon={<User className="h-4 w-4" />}
        disabled
      />

      <MenuItem
        variant="destructive"
        label="Enable"
        icon={<LogOut className="h-4 w-4" />}
      />
    </div>
  )
};
