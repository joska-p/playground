import { Button } from '@repo/ui/Button';
import { Hero } from '@repo/ui/Hero';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Hero> = {
  title: 'Stylistic/Organisms/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    badgeText: { control: 'text' },
    title: { control: 'text' },
    highlight: { control: 'text' },
    description: { control: 'text' }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    badgeText: 'Now in beta',
    title: 'Creative',
    highlight: 'Playground',
    description:
      'Explore generative art, data visualization, and interactive experiences in your browser.'
  },
  render: (args) => (
    <Hero {...args}>
      <Button variant="primary">Get Started</Button>
      <Button variant="outline">Learn More</Button>
    </Hero>
  )
};

export const WithoutBadge: Story = {
  args: {
    title: 'Creative',
    highlight: 'Coding',
    description: 'A sandbox for creative coding experiments.'
  }
};

export const WithCustomChildren: Story = {
  args: {
    badgeText: 'Featured',
    title: 'Design',
    highlight: 'Studio',
    description: 'Your hub for creative design tools and experiments.'
  },
  render: (args) => (
    <Hero {...args}>
      <Button variant="primary">Explore Tools</Button>
      <Button variant="outline">View Gallery</Button>
      <Button variant="ghost">Documentation</Button>
    </Hero>
  )
};
