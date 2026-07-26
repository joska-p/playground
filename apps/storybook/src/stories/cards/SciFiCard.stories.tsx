import { SciFiCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SciFiCard> = {
  title: 'Cards/SciFiCard',
  component: SciFiCard,
  tags: ['autodocs'],
  argTypes: {
    seed: {
      description: 'Seed for deterministic procedural SVG artwork.',
      control: { type: 'number' }
    },
    cardId: {
      description: 'Badge label shown in the top corner.',
      control: 'text'
    },
    cardTitle: {
      description: 'Card heading.',
      control: 'text'
    },
    classification: {
      description: 'Classification label.',
      control: 'text'
    },
    density: {
      description: 'Density value shown in the footer.',
      control: 'text'
    },
    resolution: {
      description: 'Resolution value shown in the footer.',
      control: 'text'
    },
    variant: {
      description: 'Color variant that sets the --variant-color CSS property.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    color: {
      description: 'Custom CSS color override for --variant-color.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SciFiCard>;

export const Default: Story = {
  args: {
    seed: 42,
    cardId: 'A-01',
    cardTitle: 'Northern Frontier',
    classification: 'Tundra',
    resolution: '256 px',
    density: '0.8 g/cm³',
    variant: 'primary'
  }
};

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {VARIANTS.map((v, i) => (
        <SciFiCard
          key={v}
          variant={v}
          seed={(i + 1) * 100}
          cardId={`sci-fi-0${i + 1}`}
          cardTitle={`${v.charAt(0).toUpperCase()}${v.slice(1)} Variant`}
          classification="Demo"
          resolution="1920×1080"
          density="72.0"
        />
      ))}
    </div>
  )
};

export const DifferentSeeds: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 42, 100, 255, 999, 12345].map((seed) => (
        <SciFiCard
          key={seed}
          seed={seed}
          cardId={`seed-${seed}`}
          cardTitle={`Seed ${seed}`}
          classification="Generated"
          resolution="1920×1080"
          density="72.0"
          variant="primary"
        />
      ))}
    </div>
  )
};
