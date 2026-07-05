import { ScrollReveal } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useSyncExternalStore } from 'react';

function MountedWrapper({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted) return null;
  return <>{children}</>;
}

const meta: Meta<typeof ScrollReveal> = {
  title: 'Stylistic/Organisms/ScrollReveal',
  component: ScrollReveal,
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      description: 'Intersection observer threshold.',
      control: { type: 'number', min: 0, max: 1, step: 0.01 }
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof ScrollReveal>;

export const Default: Story = {
  render: () => (
    <MountedWrapper>
      <div className="flex flex-col gap-8 p-8">
        <ScrollReveal>
          <div className="bg-surface rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold">Section 1</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Scroll down to reveal the next sections.
            </p>
          </div>
        </ScrollReveal>
        <div className="h-96" />
        <ScrollReveal>
          <div className="bg-surface rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold">Section 2</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              This section fades in when scrolled into view.
            </p>
          </div>
        </ScrollReveal>
        <div className="h-96" />
        <ScrollReveal>
          <div className="bg-surface rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold">Section 3</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Scroll-based reveal animations enhance the browsing experience.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </MountedWrapper>
  )
};
