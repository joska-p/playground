import { Tabs } from '@repo/ui/navigation';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the tab indicator.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  },
  args: {
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'Overview',
        content:
          'Overview content goes here. This tab provides a high-level summary of the current experiment.'
      },
      {
        label: 'Settings',
        content:
          'Adjust parameters like scale, rotation, and color palette to customize your output.'
      },
      { label: 'Code', content: 'View and edit the underlying code that powers this experiment.' }
    ]
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    tabs: [
      {
        label: 'Preview',
        content: 'See a live preview of your changes as you tweak parameters in real time.'
      },
      {
        label: 'Controls',
        content: 'Fine-tune every aspect of the visualization with precision sliders and toggles.'
      },
      { label: 'Info', content: 'Technical details, version history, and attribution information.' }
    ]
  }
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    tabs: [
      {
        label: 'Design',
        content:
          'Explore the design system tokens and visual primitives used across the playground.'
      },
      {
        label: 'Prototype',
        content: 'Rapidly prototype new interactions with hot-reloading and instant feedback.'
      },
      {
        label: 'Export',
        content: 'Export your creation as SVG, PNG, or embed code for use elsewhere.'
      }
    ]
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    tabs: [
      {
        label: 'Errors',
        content: 'A log of recent errors and warnings that occurred during the session.'
      },
      {
        label: 'Details',
        content: 'Detailed error stack traces and debugging information for developers.'
      }
    ]
  }
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { label: 'Tab A', content: 'Content for tab A.' },
      { label: 'Tab B', content: 'Content for tab B.' },
      { label: 'Tab C', content: 'Content for tab C.' },
      { label: 'Tab D', content: 'Content for tab D.' },
      { label: 'Tab E', content: 'Content for tab E.' }
    ]
  }
};
