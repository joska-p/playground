import { Accordion, AccordionItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color of the chevron indicator on each item.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    }
  }
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Accordion>
        <AccordionItem
          title="Default chevron"
          variant="default"
        >
          Neutral grey chevron — the standard look for structural content.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Primary chevron"
          variant="primary"
        >
          A primary-coloured chevron for important sections.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Accent chevron"
          variant="accent"
        >
          Accent colour draws extra attention to this section.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Destructive chevron"
          variant="destructive"
        >
          Used for destructive actions in a danger zone.
        </AccordionItem>
      </Accordion>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Closed by default">
        This section starts closed. Click to expand.
      </AccordionItem>
      <AccordionItem
        title="Open by default"
        open
      >
        This section starts open, showing its content immediately.
      </AccordionItem>
    </Accordion>
  )
};

export const WithRichContent: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Keyboard Shortcuts">
        <kbd className="bg-surface-raised rounded border px-1.5 py-0.5 text-xs">Ctrl+Space</kbd> to
        toggle the control panel.
      </AccordionItem>
      <AccordionItem title="Installation">
        Run <code className="bg-surface-raised rounded px-1 text-xs">npm install @repo/ui</code> to
        add the component library to your project.
      </AccordionItem>
    </Accordion>
  )
};
