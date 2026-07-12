import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/navigation';
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
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Overview content goes here. This tab provides a high-level summary of the experiment.
        </TabsContent>
        <TabsContent value="settings">
          Adjust parameters like scale, rotation, and color palette to customize your output.
        </TabsContent>
        <TabsContent value="code">
          View and edit the underlying code that powers this experiment.
        </TabsContent>
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
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          See a live preview of your changes as you tweak parameters in real time.
        </TabsContent>
        <TabsContent value="controls">
          Fine-tune every aspect of the visualization with precision sliders and toggles.
        </TabsContent>
        <TabsContent value="info">
          Technical details, version history, and attribution information.
        </TabsContent>
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
        <TabsList>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="prototype">Prototype</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        <TabsContent value="design">
          Explore the design system tokens and visual primitives used across the playground.
        </TabsContent>
        <TabsContent value="prototype">
          Rapidly prototype new interactions with hot-reloading and instant feedback.
        </TabsContent>
        <TabsContent value="export">
          Export your creation as SVG, PNG, or embed code for use elsewhere.
        </TabsContent>
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
        <TabsList>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="errors">
          A log of recent errors and warnings that occurred during the session.
        </TabsContent>
        <TabsContent value="details">
          Detailed error stack traces and debugging information for developers.
        </TabsContent>
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
        <TabsList>
          {['a', 'b', 'c', 'd', 'e'].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
            >
              Tab {t.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {['a', 'b', 'c', 'd', 'e'].map((t) => (
          <TabsContent
            key={t}
            value={t}
          >
            Content for tab {t.toUpperCase()}.
          </TabsContent>
        ))}
      </Tabs>
    );
  }
};
