import { Button } from '@repo/ui/Button';
import { Card } from '@repo/ui/Card';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * The Card component provides a flexible container for grouping related content and actions.
 * It is a core part of the Mosaic Maker and Data Viz layouts in the playground.
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Controls the background and border style of the card.',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'muted'],
      control: { type: 'select' }
    }
  }
};

// Required by Storybook CSF (Component Story Format) tooling
export default meta;

type Story = StoryObj<typeof Card>;

/**
 * The standard card layout using the primary background.
 * Use as the default for experiment settings and toolcards.
 */
export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold">Project Configuration</h3>
          <p className="text-muted-foreground text-sm italic">Adjust the parameters for your current experiment.</p>
        </div>
        <div className="p-6 pt-0">
          <p>Configure particle density and canvas resolution before generating.</p>
        </div>
        <div className="flex items-center justify-end gap-2 p-6 pt-0">
          <Button variant="outline">Reset</Button>
          <Button>Generate</Button>
        </div>
      </Card>
    </div>
  )
};

/**
 * Uses the secondary background for alternative cards.
 * Good for supporting or secondary content.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold">Additional Settings</h3>
          <p className="text-muted-foreground text-sm italic">Optional configurations.</p>
        </div>
        <div className="p-6 pt-0">
          <p>Advanced options for power users.</p>
        </div>
      </Card>
    </div>
  )
};

/**
 * Uses the accent background for highlighted cards.
 * Good for call-to-action cards.
 */
export const Accent: Story = {
  args: {
    variant: 'accent'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold">Special Offer</h3>
          <p className="text-muted-foreground text-sm italic">Limited time deal!</p>
        </div>
        <div className="p-6 pt-0">
          <p>Get 50% off on your next generation.</p>
        </div>
        <div className="flex items-center p-6 pt-0">
          <Button>Claim Now</Button>
        </div>
      </Card>
    </div>
  )
};

/**
 * Card with outline/border only, no background fill.
 * Good for comparison cards or nested content.
 */
export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold">Preview Mode</h3>
        </div>
        <div className="p-6 pt-0">
          <p>This card is for preview purposes.</p>
        </div>
      </Card>
    </div>
  )
};

/**
 * Minimal card with no shadow or border.
 * Good for inline content or dark backgrounds.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="p-6 pt-0">
          <p>Minimal inline card content.</p>
        </div>
      </Card>
    </div>
  )
};

/**
 * Card with dashed border for metadata or notes.
 * Good for displaying version info or timestamps.
 */
export const Muted: Story = {
  args: {
    variant: 'muted'
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl font-semibold">Metadata</h3>
        </div>
        <div className="p-6 pt-0">
          <p className="text-xs">Generated on 2024-05-20. Version 1.0.4-beta.</p>
        </div>
      </Card>
    </div>
  )
};

