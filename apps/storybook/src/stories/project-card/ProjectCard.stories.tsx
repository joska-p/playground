import { ProjectCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ProjectCard> = {
  title: 'Stylistic/Molecules/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    iconName: { control: 'text' },
    category: { control: 'text' },
    tags: { control: 'object' }
  },
  args: {
    href: '#'
  }
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    title: 'Mosaic Maker',
    description: 'Create beautiful mosaic patterns with adjustable tile sizes and color palettes.',
    iconName: 'mosaic',
    category: 'generative'
  }
};

export const WithTags: Story = {
  args: {
    title: 'Particle System',
    description: 'Interactive particle simulation with physics-based movement.',
    iconName: 'particles',
    category: 'simulation',
    tags: ['physics', 'interactive', 'real-time']
  }
};

export const DataViz: Story = {
  args: {
    title: 'Chart Explorer',
    description: 'Interactive data visualization with multiple chart types.',
    iconName: 'data-viz',
    category: 'data-viz',
    tags: ['charts', 'data']
  }
};
