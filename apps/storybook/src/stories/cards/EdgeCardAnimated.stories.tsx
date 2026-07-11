import { EdgeCardAnimated } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof EdgeCardAnimated> = {
  title: 'Cards/EdgeCardAnimated',
  component: EdgeCardAnimated,
  tags: ['autodocs'],
  argTypes: {
    seed: {
      description: 'Seed for deterministic procedural SVG artwork.',
      control: { type: 'number' }
    },
    id: {
      description: 'Badge label shown in the top-left corner.',
      control: 'text'
    },
    title: {
      description: 'Card heading.',
      control: 'text'
    },
    classification: {
      description: 'Uppercase label shown in the top-right corner.',
      control: 'text'
    },
    density: {
      description: 'Density value shown in the bottom-right.',
      control: 'text'
    },
    resolution: {
      description: 'Resolution value shown in the bottom-left.',
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

type Story = StoryObj<typeof EdgeCardAnimated>;

export const Default: Story = {
  args: {
    seed: 42,
    id: 'anim-01',
    title: 'Neural Pathway',
    classification: 'Classified',
    resolution: '3840×2160',
    density: '142.3',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    seed: 108,
    id: 'anim-02',
    title: 'Signal Cascade',
    classification: 'Restricted',
    resolution: '2560×1440',
    density: '87.1',
    variant: 'secondary'
  }
};

export const Accent: Story = {
  args: {
    seed: 256,
    id: 'anim-03',
    title: 'Phase Drift',
    classification: 'Internal',
    resolution: '1920×1080',
    density: '64.7',
    variant: 'accent'
  }
};

export const Warning: Story = {
  args: {
    seed: 512,
    id: 'anim-04',
    title: 'Threshold Breach',
    classification: 'Warning',
    resolution: '4096×2160',
    density: '203.5',
    variant: 'warning'
  }
};

export const Destructive: Story = {
  args: {
    seed: 777,
    id: 'anim-05',
    title: 'Cascade Failure',
    classification: 'Critical',
    resolution: '7680×4320',
    density: '310.2',
    variant: 'destructive'
  }
};

export const CustomColor: Story = {
  args: {
    seed: 999,
    id: 'anim-06',
    title: 'Prismatic Echo',
    classification: 'Special',
    resolution: '3200×1800',
    density: '96.8',
    color: 'var(--accent)'
  }
};

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {VARIANTS.map((v, i) => (
        <EdgeCardAnimated
          key={v}
          variant={v}
          seed={(i + 1) * 100}
          id={`anim-0${i + 1}`}
          title={`${v.charAt(0).toUpperCase()}${v.slice(1)} Variant`}
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
        <EdgeCardAnimated
          key={seed}
          seed={seed}
          id={`seed-${seed}`}
          title={`Seed ${seed}`}
          classification="Generated"
          resolution="1920×1080"
          density="72.0"
          variant="primary"
        />
      ))}
    </div>
  )
};
