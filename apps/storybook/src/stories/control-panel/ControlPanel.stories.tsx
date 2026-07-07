import {
  ControlConditional,
  ControlGrid,
  ControlPanel,
  ControlRow,
  ControlSection,
  ControlSubsection
} from '@repo/ui/control-panel';
import { Input, Select, Slider, Switch } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

const meta: Meta<typeof ControlPanel> = {
  title: 'Control Panel/ControlPanel',
  component: ControlPanel,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Header title of the panel.',
      control: 'text'
    },
    variant: {
      description: 'Accent color used in the panel.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    position: {
      description: 'Where the panel is attached.',
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' }
    },
    size: {
      description: 'Controls the panel width/height.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    defaultCollapsed: {
      description: 'Start collapsed.',
      control: 'boolean'
    }
  },
  args: {
    onChange: fn()
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof ControlPanel>;

export const AllControls: Story = {
  render: (args) => {
    const [enableNoise, setEnableNoise] = useState(false);
    return (
      <ControlPanel {...args}>
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
            <Select
              defaultValue="dark"
              onChange={fn()}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="custom">Custom</option>
            </Select>
          </ControlRow>
        </ControlSection>

        <ControlSection title="Transform">
          <ControlGrid columns={3}>
            {['X', 'Y', 'Z'].map((axis) => (
              <ControlRow
                key={axis}
                label={axis}
                value="0"
              >
                <Slider
                  variant="default"
                  defaultValue={0}
                  min={-100}
                  max={100}
                />
              </ControlRow>
            ))}
          </ControlGrid>
        </ControlSection>

        <ControlSection title="Effects">
          <ControlRow
            label="Enable Noise"
            value={enableNoise ? 'On' : 'Off'}
          >
            <Switch
              checked={enableNoise}
              onChange={(e) => setEnableNoise(e.target.checked)}
            />
          </ControlRow>

          <ControlConditional when={enableNoise}>
            <ControlRow
              label="Scale"
              value="2.0"
            >
              <Slider
                variant="secondary"
                defaultValue={50}
              />
            </ControlRow>
            <ControlRow
              label="Octaves"
              value="4"
            >
              <Slider
                variant="primary"
                defaultValue={40}
                min={1}
                max={8}
              />
            </ControlRow>
          </ControlConditional>

          <ControlRow label="Post Processing">
            <Select
              defaultValue="none"
              onChange={fn()}
            >
              <option value="none">None</option>
              <option value="bloom">Bloom</option>
              <option value="vignette">Vignette</option>
            </Select>
          </ControlRow>
        </ControlSection>

        <ControlSection
          title="Advanced"
          variant="accent"
        >
          <ControlSubsection title="Seed Configuration">
            <ControlRow
              label="Seed"
              value="42"
            >
              <Input
                type="number"
                defaultValue="42"
              />
            </ControlRow>
          </ControlSubsection>
        </ControlSection>
      </ControlPanel>
    );
  }
};

export const NoAccordion: Story = {
  render: (args) => (
    <ControlPanel
      {...args}
      title="Quick Controls"
    >
      <ControlSection title="Size">
        <ControlRow
          label="Width"
          value="800"
        >
          <Slider
            variant="primary"
            defaultValue={80}
          />
        </ControlRow>
        <ControlRow
          label="Height"
          value="600"
        >
          <Slider
            variant="primary"
            defaultValue={60}
          />
        </ControlRow>
      </ControlSection>
    </ControlPanel>
  )
};

export const NarrowPanel: Story = {
  render: (args) => (
    <ControlPanel
      {...args}
      title="Properties"
      size="sm"
    >
      <ControlSection title="Basic">
        <ControlRow
          label="Opacity"
          value="1.0"
        >
          <Slider
            variant="primary"
            defaultValue={100}
          />
        </ControlRow>
      </ControlSection>
    </ControlPanel>
  )
};

export const Empty: Story = {
  render: (args) => <ControlPanel {...args} />
};
