import { Carousel } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const items = [
  { id: 1, label: 'Mosaic', color: 'var(--primary)' },
  { id: 2, label: 'Particles', color: 'var(--secondary)' },
  { id: 3, label: 'Sequences', color: 'var(--accent)' },
  { id: 4, label: 'Simulation', color: 'var(--warning)' },
  { id: 5, label: 'Data Viz', color: 'var(--destructive)' },
  { id: 6, label: 'Generative', color: 'var(--primary)' },
  { id: 7, label: 'Pixel Art', color: 'var(--secondary)' },
  { id: 8, label: 'Pipeline', color: 'var(--accent)' }
];

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="w-full p-8">
      <Carousel aria-label="Experiment carousel">
        {items.map((item) => (
          <Carousel.Slide key={item.id}>
            <div
              className="flex h-40 w-60 items-center justify-center rounded-lg"
              style={{ background: `color-mix(in srgb, ${item.color} 20%, transparent)` }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
};

export const WithCustomSlides: Story = {
  render: () => (
    <div className="w-full p-8">
      <Carousel aria-label="Featured projects">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Carousel.Slide key={i}>
            <div className="bg-surface flex h-48 w-72 flex-col justify-between rounded-lg p-5 shadow-sm">
              <h3 className="text-foreground font-semibold">Project {i}</h3>
              <p className="text-muted-foreground text-sm">
                A brief description of this creative project.
              </p>
              <span className="text-primary text-xs tracking-wider uppercase">Experiment</span>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
};
