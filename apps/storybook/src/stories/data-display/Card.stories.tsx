import { Card } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color used for the interactive glow.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    interactive: {
      description: 'Enables the hover glow effect.',
      control: 'boolean'
    },
    horizontal: {
      description: 'Lay out as a row on desktop.',
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: { variant: 'primary' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <Card.Body>
          <Card.Title>Project Configuration</Card.Title>
          <Card.Description>Adjust the parameters to control the output.</Card.Description>
        </Card.Body>
        <Card.Footer>
          <span className="text-foreground-muted text-xs">Last edited 2h ago</span>
          <Button
            variant="ghost"
            size="sm"
          >
            Edit
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
};

export const Interactive: Story = {
  args: { interactive: true, variant: 'accent' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <Card.Image
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Abstract generative art"
        />
        <Card.Body>
          <Card.Title>Generative Waves</Card.Title>
          <Card.Description>
            A real-time wave simulation with adjustable frequency and amplitude.
          </Card.Description>
        </Card.Body>
        <Card.Actions>
          <Button
            variant="ghost"
            size="icon"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </Button>
        </Card.Actions>
      </Card>
    </div>
  )
};

export const Horizontal: Story = {
  args: { horizontal: true, variant: 'secondary' },
  render: (args) => (
    <div className="w-full max-w-lg">
      <Card {...args}>
        <Card.Image
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Preview"
        />
        <Card.Body>
          <Card.Title>Horizontal Layout</Card.Title>
          <Card.Description>
            On landscape screens this card displays as a row with the image on the left.
          </Card.Description>
        </Card.Body>
      </Card>
    </div>
  )
};

export const Outline: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <Card.Body>
          <Card.Title>Outline Card</Card.Title>
          <Card.Description>Cards use a subtle shadow by default with no border.</Card.Description>
        </Card.Body>
      </Card>
    </div>
  )
};
