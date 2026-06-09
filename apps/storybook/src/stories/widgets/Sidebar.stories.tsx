import { Sidebar } from '@repo/ui/Sidebar';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

type Story = StoryObj<typeof Sidebar>;

/**
 * A flexible, responsive Sidebar component that supports various positions and themes.
 * The Toggle automatically stays accessible and positions itself based on the sidebar's location.
 */
const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The background theme of the sidebar panel.',
      options: ['primary', 'secondary', 'accent', 'destructive', 'outline', 'ghost'],
      control: { type: 'select' },
    },
    mobilePosition: {
      description: 'Layout of the sidebar on mobile screens.',
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
    desktopPosition: {
      description: 'Layout of the sidebar on desktop screens.',
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
    defaultOpen: {
      description: 'Whether the sidebar is open by default.',
      control: 'boolean',
    },
  },
  args: {
    defaultOpen: true,
  },
};

// Required by Storybook CSF (Component Story Format) tooling
export default meta;

function SidebarTemplate(args: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="border-muted-foreground/20 bg-background h-[500px] w-full overflow-hidden border border-dashed">
      <Sidebar
        {...args}
        className="h-full"
      >
        <Sidebar.Panel className="p-4">
          <Sidebar.Toggle />
          <h3 className="mb-4 font-bold">Controls</h3>
          <nav className="space-y-2">
            <div className="cursor-pointer rounded p-2 hover:bg-black/5">
              Brush Settings
            </div>
            <div className="cursor-pointer rounded p-2 hover:bg-black/5">
              Layer Manager
            </div>
          </nav>
        </Sidebar.Panel>
        <Sidebar.Main className="p-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-2 text-2xl font-bold">Workspace Area</h2>
            <p className="text-muted-foreground">
              Current Position: <strong>{args.desktopPosition}</strong>
              <br />
              Current Variant: <strong>{args.variant}</strong>
            </p>
          </div>
        </Sidebar.Main>
      </Sidebar>
    </div>
  );
}

export const NormalLeft: Story = {
  render: (args) => <SidebarTemplate {...args} />,
  args: { variant: 'primary', desktopPosition: 'left' },
};

export const PrimaryRight: Story = {
  render: (args) => <SidebarTemplate {...args} />,
  args: { variant: 'primary', desktopPosition: 'right' },
};

export const SecondaryTop: Story = {
  render: (args) => <SidebarTemplate {...args} />,
  args: { variant: 'secondary', desktopPosition: 'top' },
};

export const AccentBottom: Story = {
  render: (args) => <SidebarTemplate {...args} />,
  args: { variant: 'accent', desktopPosition: 'bottom' },
};
