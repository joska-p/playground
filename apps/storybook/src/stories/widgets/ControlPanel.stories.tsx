import { ControlPanel } from '@repo/ui/ControlPanel';
import { iconMap } from '@repo/ui/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

type Story = StoryObj<typeof ControlPanel>;

const icon = iconMap['palette'];

const sampleSections = [
  {
    id: 'appearance',
    label: 'Appearance',
    icon,
    defaultOpen: true,
    controls: [
      {
        id: 'hue',
        label: 'Hue',
        type: 'slider' as const,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: fn()
      },
      { id: 'bg', label: 'Background', type: 'color' as const, value: '#282828', onChange: fn() },
      { id: 'dark', label: 'Dark Mode', type: 'toggle' as const, value: true, onChange: fn() },
      {
        id: 'theme',
        label: 'Theme',
        type: 'select' as const,
        value: 'gruvbox',
        options: [
          { label: 'Gruvbox', value: 'gruvbox' },
          { label: 'Nord', value: 'nord' },
          { label: 'Catppuccin', value: 'catppuccin' }
        ],
        onChange: fn()
      }
    ]
  },
  {
    id: 'transform',
    label: 'Transform',
    icon: iconMap['box'],
    controls: [
      {
        id: 'position',
        label: 'Position',
        type: 'vec2' as const,
        value: [0, 0] as [number, number],
        min: -10,
        max: 10,
        step: 0.1,
        onChange: fn()
      },
      {
        id: 'rotation',
        label: 'Rotation',
        type: 'vec3' as const,
        value: [0, 0, 0] as [number, number, number],
        min: -180,
        max: 180,
        step: 1,
        onChange: fn()
      },
      {
        id: 'scale',
        label: 'Scale',
        type: 'number' as const,
        value: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        onChange: fn()
      }
    ]
  },
  {
    id: 'actions',
    label: 'Actions',
    icon: iconMap['wrench'],
    controls: [
      {
        id: 'reset',
        label: 'Reset All',
        type: 'button' as const,
        variant: 'danger' as const,
        onClick: fn()
      },
      {
        id: 'apply',
        label: 'Apply Preset',
        type: 'button' as const,
        variant: 'primary' as const,
        onClick: fn()
      },
      {
        id: 'export',
        label: 'Export',
        type: 'button' as const,
        variant: 'default' as const,
        onClick: fn()
      }
    ]
  }
];

const meta: Meta<typeof ControlPanel> = {
  title: 'Widgets/ControlPanel',
  component: ControlPanel,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text', description: 'Tailwind width class for the side panel.' },
    accordion: { control: 'boolean', description: 'Only one section open at a time.' },
    defaultOpenSections: { control: 'object', description: 'Sections to open by default.' },
    header: { control: 'text', description: 'Content rendered above the sections.' },
    footer: { control: 'text', description: 'Content rendered below the sections.' },
    open: { control: 'boolean', description: 'Controlled open state.' },
    onOpenChange: { control: false }
  },
  args: {
    sections: sampleSections
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

export const AllControls: Story = {};

export const NoAccordion: Story = {
  args: {
    accordion: false,
    defaultOpenSections: ['appearance', 'transform']
  }
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <div className="px-4 py-3 text-sm font-semibold">Scene Controls</div>,
    footer: (
      <div className="text-muted-foreground flex items-center justify-between px-4 py-2 text-xs">
        <span>v1.0.0</span>
        <span>4 active controls</span>
      </div>
    )
  }
};

export const NarrowPanel: Story = {
  args: {
    width: 'w-56'
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' }
  }
};

export const Empty: Story = {
  args: {
    sections: []
  }
};

export const SingleSection: Story = {
  args: {
    sections: [sampleSections[0]]
  }
};
