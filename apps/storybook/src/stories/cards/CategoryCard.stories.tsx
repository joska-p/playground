import { CategoryCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CategoryCard> = {
  title: 'Cards/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Category name displayed below the icon.',
      control: 'text'
    },
    description: {
      description: 'Short description of the category.',
      control: 'text'
    },
    iconName: {
      description: 'Icon to display.',
      control: 'text'
    },
    count: {
      description: 'Number of experiments in this category.',
      control: { type: 'number', min: 0 }
    }
  },
  args: {
    href: '/category/'
  }
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Generative: Story = {
  args: {
    label: 'Generative',
    description: 'Procedural patterns and generative art',
    iconName: 'sparkles',
    count: 24,
    href: '/category/generative'
  }
};

export const DataViz: Story = {
  args: {
    label: 'Data Viz',
    description: 'Interactive data visualizations',
    iconName: 'data-viz',
    count: 18,
    href: '/category/data-viz'
  }
};

export const Simulation: Story = {
  args: {
    label: 'Simulation',
    description: 'Physics and particle simulations',
    iconName: 'simulation',
    count: 12,
    href: '/category/simulation'
  }
};
