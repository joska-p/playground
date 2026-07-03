import { SectionHeader } from '@repo/ui/SectionHeader';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionHeader> = {
  title: 'Stylistic/Organisms/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    iconName: { control: 'text' },
    href: { control: 'text' },
    linkText: { control: 'text' },
    category: { control: 'text' },
    align: {
      options: ['left', 'center'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {
    title: 'Experiments',
    description: 'A curated collection of creative coding experiments.',
    iconName: 'box',
    href: '#',
    linkText: 'View all'
  }
};

export const CenterAligned: Story = {
  args: {
    title: 'Featured Projects',
    description: 'Hand-picked projects showcasing the best of the playground.',
    iconName: 'sparkles',
    align: 'center'
  }
};

export const WithCategory: Story = {
  args: {
    title: 'Generative Art',
    description: 'Explore AI-powered generative art tools and experiments.',
    iconName: 'generative',
    category: 'generative',
    href: '#'
  }
};

export const TitleOnly: Story = {
  args: {
    title: 'Quick Links'
  }
};

export const DataVizSection: Story = {
  args: {
    title: 'Data Visualization',
    description: 'Interactive charts and data exploration tools.',
    iconName: 'data-viz',
    category: 'data-viz',
    href: '#',
    linkText: 'Explore charts'
  }
};
