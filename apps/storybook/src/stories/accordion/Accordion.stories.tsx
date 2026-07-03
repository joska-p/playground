import { Accordion } from '@repo/ui/Accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Background style for the accordion container.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    variant: 'default'
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item title="What is this playground?">
        A creative sandbox for experimenting with generative art, data visualization, and
        interactive experiences using modern web technologies.
      </Accordion.Item>
      <Accordion.Item title="How do I get started?">
        Browse the available experiments, pick one that interests you, and start tweaking the
        parameters. Each experiment comes with a set of controls.
      </Accordion.Item>
      <Accordion.Item title="Can I contribute?">
        Absolutely! Check out the contributing guide in the repository for details on how to add new
        experiments or improve existing ones.
      </Accordion.Item>
    </Accordion>
  )
};

export const DefaultOpen: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item
        title="Getting Started"
        defaultOpen
      >
        Start by exploring the available experiments in the sidebar. Each card represents a unique
        creative tool.
      </Accordion.Item>
      <Accordion.Item title="Keyboard Shortcuts">
        Use Ctrl+Space to toggle the command palette and Ctrl+/ to search documentation.
      </Accordion.Item>
    </Accordion>
  )
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item
        title="Primary Themed Item"
        variant="primary"
      >
        This item uses the primary theme ring and background.
      </Accordion.Item>
      <Accordion.Item title="Default Item">This item uses the default styling.</Accordion.Item>
    </Accordion>
  )
};

export const AccentVariant: Story = {
  args: {
    variant: 'accent'
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item
        title="Accent Themed Item"
        variant="accent"
      >
        This item uses the accent theme ring and background.
      </Accordion.Item>
      <Accordion.Item title="Default Item">This item uses the default styling.</Accordion.Item>
    </Accordion>
  )
};

export const DestructiveVariant: Story = {
  args: {
    variant: 'destructive'
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item
        title="Destructive Themed Item"
        variant="destructive"
      >
        This item uses the destructive theme ring and background.
      </Accordion.Item>
    </Accordion>
  )
};
