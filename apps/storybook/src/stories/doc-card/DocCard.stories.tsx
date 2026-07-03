import { DocCard } from '@repo/ui/DocCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DocCard> = {
  title: 'Stylistic/Molecules/DocCard',
  component: DocCard,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    type: { control: 'text' },
    iconName: { control: 'text' }
  },
  args: {
    href: '#',
    title: 'Getting Started',
    description: 'Learn how to set up your first experiment in the playground.',
    type: 'guide',
    iconName: 'book'
  }
};

export default meta;

type Story = StoryObj<typeof DocCard>;

export const Default: Story = {};

export const Reference: Story = {
  args: {
    title: 'API Reference',
    description: 'Complete API documentation for all components and hooks.',
    type: 'reference',
    iconName: 'code'
  }
};

export const Tutorial: Story = {
  args: {
    title: 'Building a Mosaic',
    description: 'Step-by-step tutorial on creating a mosaic visualization from scratch.',
    type: 'tutorial',
    iconName: 'pixel-manipulator'
  }
};

export const WithoutDescription: Story = {
  args: {
    title: 'Changelog',
    description: undefined,
    type: 'release',
    iconName: 'documentation'
  }
};
