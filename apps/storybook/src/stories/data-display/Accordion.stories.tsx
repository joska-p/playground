import { Accordion, AccordionItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AccordionItem> = {
  title: 'Data Display/Accordion',
  component: AccordionItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color of the chevron indicator and background faided.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof AccordionItem>;

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
          title="Default"
          variant="default"
        >
          Neutral grey chevron — the standard look for structural content.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Primary"
          variant="primary"
        >
          A primary-coloured chevron for important sections.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Secondary"
          variant="secondary"
        >
          Secondary colour for supporting sections.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Accent"
          variant="accent"
        >
          Accent colour draws extra attention to this section.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Warning"
          variant="warning"
        >
          Warning colour for cautionary content.
        </AccordionItem>
      </Accordion>
      <Accordion>
        <AccordionItem
          title="Destructive"
          variant="destructive"
        >
          Used for destructive actions in a danger zone.
        </AccordionItem>
      </Accordion>
    </div>
  )
};

export const OpenByDefault: Story = {
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
