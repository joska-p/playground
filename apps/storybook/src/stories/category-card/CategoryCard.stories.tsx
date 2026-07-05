import { CategoryCard } from '@repo/ui/cards';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CategoryCard> = {
  title: 'Stylistic/Molecules/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    id: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    iconName: { control: 'text' },
    count: { control: 'number' }
  },
  args: {
    href: '#'
  }
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Generative: Story = {
  args: {
    id: 'generative',
    label: 'Generative Art',
    description: 'AI-powered creative tools',
    iconName: 'generative',
    count: 12
  }
};

export const DataViz: Story = {
  args: {
    id: 'data-viz',
    label: 'Data Visualization',
    description: 'Interactive charts and graphs',
    iconName: 'data-viz',
    count: 8
  }
};

export const Simulation: Story = {
  args: {
    id: 'simulation',
    label: 'Simulations',
    description: 'Physics and particle systems',
    iconName: 'simulation',
    count: 6
  }
};
