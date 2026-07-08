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

const meta: Meta<typeof ControlPanel> = {
  title: 'Control Panel/ControlPanel',
  component: ControlPanel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    variant: {
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'warning',
        'destructive',
        'ghost',
        'outline'
      ],
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

export const VariantPrimary: Story = {
  args: {
    title: 'Primary',
    variant: 'primary',
    position: 'left',
    size: 'lg',
    children: simpleChildren
  }
};

export const VariantAccent: Story = {
  args: {
    title: 'Accent',
    variant: 'accent',
    position: 'right',
    size: 'md',
    children: simpleChildren
  }
};

export const VariantOutline: Story = {
  args: {
    title: 'Outline',
    variant: 'outline',
    position: 'bottom',
    size: 'sm',
    children: simpleChildren
  }
};

export const Collapsed: Story = {
  args: {
    title: 'Controls',
    variant: 'default',
    position: 'right',
    size: 'md',
    defaultCollapsed: true,
    children: (
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
      </ControlSection>
    )
  }
};

export const WithGrid: Story = {
  args: {
    title: 'Transform',
    variant: 'default',
    position: 'right',
    size: 'sm',
    children: (
      <ControlSection title="Position">
        <ControlGrid columns={2}>
          {['X', 'Y', 'Z'].map((axis) => (
            <ControlRow
              key={axis}
              label={axis}
              value="0"
            >
              <Slider
                variant="primary"
                defaultValue={0}
                min={-100}
                max={100}
              />
            </ControlRow>
          ))}
        </ControlGrid>
      </ControlSection>
    )
  }
};

export const WithConditional: Story = {
  render: () => {
    const [enableNoise, setEnableNoise] = useState(false);
    return (
      <ControlPanel
        title="Effects"
        variant="default"
        position="right"
        size="md"
      >
        <ControlSection title="Post Processing">
          <ControlRow
            label="Bloom"
            value={enableNoise ? 'On' : 'Off'}
          >
            <Switch
              checked={enableNoise}
              onChange={(e) => setEnableNoise(e.target.checked)}
            />
          </ControlRow>
          <ControlConditional when={enableNoise}>
            <ControlRow
              label="Intensity"
              value="2.0"
            >
              <Slider
                variant="secondary"
                defaultValue={50}
              />
            </ControlRow>
            <ControlRow
              label="Radius"
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
        </ControlSection>
      </ControlPanel>
    );
  }
};

export const WithSubsection: Story = {
  args: {
    title: 'Advanced',
    variant: 'default',
    position: 'right',
    size: 'sm',
    children: (
      <ControlSection title="Rendering">
        <ControlRow
          label="Resolution"
          value="1920×1080"
        >
          <Select defaultValue="1080p">
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </Select>
        </ControlRow>
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
          <ControlRow
            label="Iterations"
            value="100"
          >
            <Slider
              variant="primary"
              defaultValue={100}
              min={1}
              max={1000}
            />
          </ControlRow>
        </ControlSubsection>
      </ControlSection>
    )
  }
};

export const FullExample: Story = {
  render: () => {
    const [enableNoise, setEnableNoise] = useState(false);
    return (
      <ControlPanel
        title="Controls"
        variant="primary"
        position="right"
        size="md"
      >
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
        </ControlSection>
      </ControlPanel>
    );
  }
};
