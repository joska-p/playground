import { Carousel, CarouselSlide } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color of the scroll arrow icons.',
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'warning',
        'destructive',
        'ghost',
        'outline'
      ],
      control: { type: 'select' }
    },
    hideArrows: {
      description: 'Hide the prev/next arrow buttons.',
      control: 'boolean'
    },
    scrollAmount: {
      description: 'Pixels scrolled per arrow click.',
      control: { type: 'number', min: 100, max: 600, step: 20 }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const slides = [
  { title: 'Generative Waves', description: 'A flowing wave pattern driven by Perlin noise.' },
  { title: 'Particle System', description: 'Thousands of interactive particles with gravity.' },
  { title: 'Fractal Explorer', description: 'Navigate the Mandelbrot set at any zoom level.' },
  { title: 'Fluid Simulation', description: 'Real-time fluid dynamics with colorful dyes.' },
  { title: 'Cellular Automata', description: 'Conway&#8217;s Game of Life with custom rules.' },
  { title: 'Generative Waves', description: 'A flowing wave pattern driven by Perlin noise.' },
  { title: 'Particle System', description: 'Thousands of interactive particles with gravity.' },
  { title: 'Fractal Explorer', description: 'Navigate the Mandelbrot set at any zoom level.' },
  { title: 'Fluid Simulation', description: 'Real-time fluid dynamics with colorful dyes.' },
  { title: 'Cellular Automata', description: 'Conway&#8217;s Game of Life with custom rules.' }
];

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {slides.map((s) => (
        <CarouselSlide key={s.title}>
          <div className="flex h-40 flex-col justify-end p-4">
            <p className="text-foreground text-sm font-medium">{s.title}</p>
            <p className="text-foreground-muted mt-1 text-xs">{s.description}</p>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  )
};
