import { DocCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DocCard> = {
  title: 'Cards/DocCard',
  component: DocCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Document title.',
      control: 'text'
    },
    description: {
      description: 'Short summary of the document.',
      control: 'text'
    },
    type: {
      description: 'Badge label shown at the top.',
      control: 'text'
    },
    iconName: {
      description: 'Icon shown next to the type badge.',
      control: 'text'
    }
  },
  args: {
    href: '/docs/'
  }
};

export default meta;

type Story = StoryObj<typeof DocCard>;

export const Default: Story = {
  args: {
    title: 'Getting Started Guide',
    description: 'Learn how to set up your first project and navigate the interface.',
    type: 'tutorial',
    iconName: 'book',
    href: '/docs/getting-started'
  }
};

export const Reference: Story = {
  args: {
    title: 'API Reference',
    description: 'Complete documentation of all available functions and their parameters.',
    type: 'reference',
    iconName: 'code',
    href: '/docs/api'
  }
};

export const Tutorial: Story = {
  args: {
    title: 'Building a Shader',
    description: 'Step-by-step walkthrough for creating custom shaders from scratch.',
    type: 'tutorial',
    iconName: 'flame',
    href: '/docs/shader-tutorial'
  }
};

export const WithoutDescription: Story = {
  args: {
    title: 'Release Notes',
    type: 'changelog',
    iconName: 'documentation',
    href: '/docs/changelog'
  }
};
