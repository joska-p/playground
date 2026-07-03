import { FloatingNav } from '@repo/ui/FloatingNav';
import type { Meta, StoryObj } from '@storybook/react-vite';

const links = [
  { label: 'Experiments', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'About', href: '#' }
];

const meta: Meta<typeof FloatingNav> = {
  title: 'Stylistic/Organisms/FloatingNav',
  component: FloatingNav,
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'object' },
    links: { control: 'object' }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof FloatingNav>;

export const Default: Story = {
  args: {
    brand: { label: 'Playground', href: '#' },
    links
  },
  render: (args) => (
    <div className="relative flex min-h-64 items-start justify-center pt-8">
      <div className="bg-muted h-48 w-full rounded-md" />
      <FloatingNav {...args} />
    </div>
  )
};

export const WithThemeToggle: Story = {
  args: {
    brand: { label: 'Playground', href: '#' },
    links,
    themeToggle: (
      <button
        className="text-muted-foreground hover:text-foreground ml-2 cursor-pointer rounded-full p-1 transition-colors"
        aria-label="Toggle theme"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    )
  },
  render: (args) => (
    <div className="relative flex min-h-64 items-start justify-center pt-8">
      <div className="bg-muted h-48 w-full rounded-md" />
      <FloatingNav {...args} />
    </div>
  )
};
