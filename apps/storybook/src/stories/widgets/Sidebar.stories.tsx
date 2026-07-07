import { Sidebar } from '@repo/ui/widgets';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: 'Where the sidebar panel is attached.',
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' }
    },
    variant: {
      description: 'Accent color for the toggle button.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    defaultOpen: {
      description: 'Start with the panel open.',
      control: 'boolean'
    },
    panelWidth: {
      description: 'CSS width of the panel (e.g. "300px", "20rem").',
      control: 'text'
    },
    panelHeight: {
      description: 'CSS height of the panel for top/bottom positions.',
      control: 'text'
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const NormalLeft: Story = {
  args: {
    position: 'left',
    defaultOpen: true,
    panelWidth: '280px'
  },
  render: (args) => (
    <Sidebar {...args}>
      <Sidebar.Main className="flex flex-col items-center justify-center p-8">
        <p className="text-foreground-muted text-sm">Main content area</p>
      </Sidebar.Main>
      <Sidebar.Panel className="p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-sm font-semibold">Layers</h3>
          {['Background', 'Shapes', 'Text Overlay'].map((layer) => (
            <div
              key={layer}
              className="text-foreground-muted cursor-pointer rounded px-2 py-1 text-xs hover:bg-white/5"
            >
              {layer}
            </div>
          ))}
        </div>
      </Sidebar.Panel>
      <div className="absolute top-4 right-4">
        <Sidebar.Toggle />
      </div>
    </Sidebar>
  )
};

export const RightWithCode: Story = {
  args: {
    position: 'right',
    defaultOpen: true,
    panelWidth: '300px'
  },
  render: (args) => (
    <Sidebar {...args}>
      <Sidebar.Main className="flex flex-col items-center justify-center p-8">
        <p className="text-foreground-muted text-sm">Editor area</p>
      </Sidebar.Main>
      <Sidebar.Panel className="p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-sm font-semibold">Properties</h3>
          <div className="text-foreground-muted space-y-3 text-xs">
            <div className="flex justify-between">
              <span>Width</span>
              <span>800px</span>
            </div>
            <div className="flex justify-between">
              <span>Height</span>
              <span>600px</span>
            </div>
            <div className="flex justify-between">
              <span>FPS</span>
              <span>60</span>
            </div>
          </div>
        </div>
      </Sidebar.Panel>
    </Sidebar>
  )
};
