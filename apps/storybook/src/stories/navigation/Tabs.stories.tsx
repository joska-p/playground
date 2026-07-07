import { Tabs } from '@repo/ui/navigation';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color for the active tab indicator.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const [tab, setTab] = useState('overview');
    return (
      <Tabs
        value={tab}
        onValueChange={setTab}
        {...args}
      >
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          Overview content goes here. This tab provides a high-level summary of the experiment.
        </Tabs.Content>
        <Tabs.Content value="settings">
          Adjust parameters like scale, rotation, and color palette to customize your output.
        </Tabs.Content>
        <Tabs.Content value="code">
          View and edit the underlying code that powers this experiment.
        </Tabs.Content>
      </Tabs>
    );
  }
};

export const Primary: Story = {
  render: (args) => {
    const [tab, setTab] = useState('preview');
    return (
      <Tabs
        value={tab}
        onValueChange={setTab}
        variant="primary"
        {...args}
      >
        <Tabs.List>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="controls">Controls</Tabs.Trigger>
          <Tabs.Trigger value="info">Info</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="preview">
          See a live preview of your changes as you tweak parameters in real time.
        </Tabs.Content>
        <Tabs.Content value="controls">
          Fine-tune every aspect of the visualization with precision sliders and toggles.
        </Tabs.Content>
        <Tabs.Content value="info">
          Technical details, version history, and attribution information.
        </Tabs.Content>
      </Tabs>
    );
  }
};

export const Accent: Story = {
  render: (args) => {
    const [tab, setTab] = useState('design');
    return (
      <Tabs
        value={tab}
        onValueChange={setTab}
        variant="accent"
        {...args}
      >
        <Tabs.List>
          <Tabs.Trigger value="design">Design</Tabs.Trigger>
          <Tabs.Trigger value="prototype">Prototype</Tabs.Trigger>
          <Tabs.Trigger value="export">Export</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="design">
          Explore the design system tokens and visual primitives used across the playground.
        </Tabs.Content>
        <Tabs.Content value="prototype">
          Rapidly prototype new interactions with hot-reloading and instant feedback.
        </Tabs.Content>
        <Tabs.Content value="export">
          Export your creation as SVG, PNG, or embed code for use elsewhere.
        </Tabs.Content>
      </Tabs>
    );
  }
};

export const Destructive: Story = {
  render: (args) => {
    const [tab, setTab] = useState('errors');
    return (
      <Tabs
        value={tab}
        onValueChange={setTab}
        variant="destructive"
        {...args}
      >
        <Tabs.List>
          <Tabs.Trigger value="errors">Errors</Tabs.Trigger>
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="errors">
          A log of recent errors and warnings that occurred during the session.
        </Tabs.Content>
        <Tabs.Content value="details">
          Detailed error stack traces and debugging information for developers.
        </Tabs.Content>
      </Tabs>
    );
  }
};

export const ManyTabs: Story = {
  render: (args) => {
    const [tab, setTab] = useState('a');
    return (
      <Tabs
        value={tab}
        onValueChange={setTab}
        {...args}
      >
        <Tabs.List>
          {['a', 'b', 'c', 'd', 'e'].map((t) => (
            <Tabs.Trigger
              key={t}
              value={t}
            >
              Tab {t.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {['a', 'b', 'c', 'd', 'e'].map((t) => (
          <Tabs.Content
            key={t}
            value={t}
          >
            Content for tab {t.toUpperCase()}.
          </Tabs.Content>
        ))}
      </Tabs>
    );
  }
};
