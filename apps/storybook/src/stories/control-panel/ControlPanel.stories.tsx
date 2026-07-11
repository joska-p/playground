import { ControlPanel, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select, Slider } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ControlPanel> = {
  title: 'Control Panel/ControlPanel',
  component: ControlPanel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    defaultCollapsed: { control: 'boolean' }
  },
  parameters: { layout: 'fullscreen' }
};

export default meta;

type Story = StoryObj<typeof ControlPanel>;

const simpleChildren = (
  <ControlSection title="Appearance">
    <ControlRow
      label="Hue"
      value="0.5"
    >
      <Slider
        variant="primary"
        defaultValue={50}
      />
    </ControlRow>
    <ControlRow
      label="Saturation"
      value="0.8"
    >
      <Slider
        variant="accent"
        defaultValue={80}
      />
    </ControlRow>
    <ControlRow label="Theme">
      <Select defaultValue="dark">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="custom">Custom</option>
      </Select>
    </ControlRow>
  </ControlSection>
);

export const Default: Story = {
  args: {
    title: 'Controls',
    variant: 'default',
    position: 'right',
    size: 'md',
    children: simpleChildren
  }
};

export const Variants: Story = {
  render: () => (
    <div className="relative grid grid-cols-1 gap-4">
      <div className="relative h-80">
        <ControlPanel
          title="Default"
          position="left"
          size="lg"
          variant="default"
        >
          {simpleChildren}
        </ControlPanel>
      </div>

      <div className="relative h-80">
        <ControlPanel
          title="primary"
          position="right"
          size="lg"
          variant="primary"
        >
          {simpleChildren}
        </ControlPanel>
      </div>

      <div className="relative h-80">
        <ControlPanel
          title="secondary"
          position="top"
          size="lg"
          variant="secondary"
        >
          {simpleChildren}
        </ControlPanel>
      </div>

      <div className="relative h-80">
        <ControlPanel
          title="Accent"
          variant="accent"
          position="bottom"
          size="md"
        >
          {simpleChildren}
        </ControlPanel>
      </div>

      <div className="relative h-80">
        <ControlPanel
          title="warning"
          variant="warning"
          position="bottom"
          size="sm"
        >
          {simpleChildren}
        </ControlPanel>
      </div>

      <div className="relative h-80">
        <ControlPanel
          title="destructive"
          variant="destructive"
          position="left"
          size="sm"
        >
          {simpleChildren}
        </ControlPanel>
      </div>
    </div>
  )
};
