import { Accordion, AccordionItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="What is this playground?">
        A creative sandbox for experimenting with generative art, shaders, and interactive
        visualizations — all powered by WebGPU and React 19.
      </AccordionItem>
      <AccordionItem title="How do I get started?">
        Browse the available experiments, tweak parameters in the control panel, and see your
        changes reflected in real time.
      </AccordionItem>
      <AccordionItem title="Can I contribute?">
        Absolutely! Check out the contributing guide in the repository to get started.
      </AccordionItem>
    </Accordion>
  )
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Getting Started">
        Start by exploring the gallery of presets or create a new blank canvas. Use the toolbar on
        the left to access all available tools.
      </AccordionItem>
      <AccordionItem title="Keyboard Shortcuts">
        <kbd className="bg-surface-raised rounded border px-1.5 py-0.5 text-xs">Ctrl+Space</kbd> to
        toggle the control panel.
      </AccordionItem>
    </Accordion>
  )
};

export const PrimaryVariant: Story = {
  render: () => (
    <Accordion>
      <AccordionItem
        title="Installation"
        variant="primary"
      >
        Run <code className="bg-surface-raised rounded px-1 text-xs">npm install @repo/ui</code> to
        add the component library to your project.
      </AccordionItem>
      <AccordionItem
        title="Configuration"
        variant="primary"
      >
        Import the stylesheet and wrap your app with the ThemeProvider.
      </AccordionItem>
    </Accordion>
  )
};

export const AccentVariant: Story = {
  render: () => (
    <Accordion>
      <AccordionItem
        title="Pro Tips"
        variant="accent"
      >
        Use the search bar to quickly find experiments by name or tag.
      </AccordionItem>
      <AccordionItem
        title="Shortcuts"
        variant="accent"
      >
        Press <kbd className="bg-surface-raised rounded border px-1.5 py-0.5 text-xs">G</kbd> to
        toggle the grid overlay.
      </AccordionItem>
    </Accordion>
  )
};

export const DestructiveVariant: Story = {
  render: () => (
    <Accordion>
      <AccordionItem
        title="Danger Zone"
        variant="destructive"
      >
        Clearing your workspace will remove all unsaved experiments. This action cannot be undone.
      </AccordionItem>
      <AccordionItem
        title="Reset Settings"
        variant="destructive"
      >
        Restore all settings to their default values. Custom presets will be preserved.
      </AccordionItem>
    </Accordion>
  )
};
