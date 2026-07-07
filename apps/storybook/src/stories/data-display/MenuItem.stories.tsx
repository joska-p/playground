import { MenuItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogOut, Settings, Trash2, User } from 'lucide-react';
import { fn } from 'storybook/test';

const meta: Meta<typeof MenuItem> = {
  title: 'Data Display/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color of the icon background.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Text label of the menu item.',
      control: 'text'
    }
  },
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: { label: 'Profile', icon: <User className="h-4 w-4" /> }
};

export const WithIcon: Story = {
  args: { variant: 'primary', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
};

export const Destructive: Story = {
  args: { variant: 'destructive', label: 'Delete project', icon: <Trash2 className="h-4 w-4" /> }
};

export const MenuList: Story = {
  render: () => (
    <div className="w-48 rounded-lg border p-1 shadow-sm">
      <MenuItem
        label="Profile"
        icon={<User className="h-4 w-4" />}
      />
      <MenuItem
        label="Settings"
        icon={<Settings className="h-4 w-4" />}
      />
      <MenuItem
        variant="destructive"
        label="Sign out"
        icon={<LogOut className="h-4 w-4" />}
      />
    </div>
  )
};
