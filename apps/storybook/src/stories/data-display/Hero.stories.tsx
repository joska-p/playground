import { Hero } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Hero> = {
  title: 'Data Display/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color used for the heading gradient.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    badgeText: {
      description: 'Small badge label above the heading.',
      control: 'text'
    },
    title: {
      description: 'Main heading text (displayed after the highlight).',
      control: 'text'
    },
    highlight: {
      description: 'Large highlight word displayed above the title.',
      control: 'text'
    },
    description: {
      description: 'Supporting paragraph below the heading.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    badgeText: 'New release v3.0',
    title: 'Playground',
    highlight: 'Creative',
    description: 'A generative art studio powered by WebGPU and React 19.'
  }
};

export const WithoutBadge: Story = {
  args: {
    title: 'Experiments',
    highlight: 'Explore',
    description: 'Discover interactive visualizations and creative coding projects.'
  }
};

export const WithCustomChildren: Story = {
  args: {
    badgeText: 'Interactive',
    title: 'Dashboard',
    highlight: 'Studio',
    description: 'Your creative workspace for building generative art.'
  },
  render: (args) => (
    <Hero {...args}>
      <Button variant="primary">Get Started</Button>
      <Button>Learn More</Button>
    </Hero>
  )
};
