import { MenuItem } from '@repo/ui/MenuItem';
import { Icon } from '@repo/ui/Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof MenuItem> = {
  title: 'Stylistic/Molecules/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    destructive: { control: 'boolean' },
    icon: { control: false }
  },
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    label: 'New Project'
  }
};

export const WithIcon: Story = {
  args: {
    label: 'Open File',
    icon: <Icon name="box" />
  }
};

export const Destructive: Story = {
  args: {
    label: 'Delete Project',
    destructive: true,
    icon: <Icon name="close" />
  }
};

export const MenuList: Story = {
  render: () => (
    <div className="bg-surface w-48 rounded-lg border p-1 shadow-sm">
      <MenuItem label="New Project" />
      <MenuItem
        label="Open File"
        icon={<Icon name="box" />}
      />
      <MenuItem label="Save" />
      <MenuItem
        label="Export"
        icon={<Icon name="code" />}
      />
      <hr className="border-border my-1" />
      <MenuItem
        label="Delete"
        destructive
        icon={<Icon name="close" />}
      />
    </div>
  )
};
