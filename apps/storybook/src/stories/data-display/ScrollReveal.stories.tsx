import { ScrollReveal } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ScrollReveal> = {
  title: 'Data Display/ScrollReveal',
  component: ScrollReveal,
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      description: 'Intersection ratio threshold (0–1) to trigger the reveal.',
      control: { type: 'range', min: 0, max: 1, step: 0.01 }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ScrollReveal>;

export const Default: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div className="h-96" />
      <ScrollReveal {...args}>
        <div className="bg-surface mx-auto max-w-md rounded-lg p-8 text-center shadow-sm">
          <h3 className="text-foreground text-lg font-semibold">Revealed Content</h3>
          <p className="text-foreground-muted mt-2 text-sm">
            This section fades in and slides up as you scroll into view.
          </p>
        </div>
      </ScrollReveal>
      <div className="h-96" />
    </div>
  )
};
