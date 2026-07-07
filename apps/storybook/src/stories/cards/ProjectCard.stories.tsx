import { ProjectCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ProjectCard> = {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Project title.',
      control: 'text'
    },
    description: {
      description: 'Short description of the project.',
      control: 'text'
    },
    iconName: {
      description: 'Icon displayed in the top-right corner.',
      control: 'text'
    },
    tags: {
      description: 'Tags shown at the bottom of the card.',
      control: 'object'
    }
  },
  args: {
    href: '/project/'
  }
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    title: 'Wave Generator',
    description: 'A real-time wave simulation with adjustable frequency and amplitude parameters.',
    iconName: 'generative',
    href: '/project/wave-generator'
  }
};

export const WithTags: Story = {
  args: {
    title: 'Particle System',
    description: 'Thousands of interactive particles responding to mouse movement and gravity.',
    iconName: 'particles',
    tags: ['WebGPU', 'interactive', 'particles'],
    href: '/project/particles'
  }
};

export const DataViz: Story = {
  args: {
    title: 'Network Graph',
    description: 'Interactive force-directed graph visualization of connected data nodes.',
    iconName: 'graphify',
    tags: ['data-viz', 'd3', 'network'],
    href: '/project/network-graph'
  }
};
