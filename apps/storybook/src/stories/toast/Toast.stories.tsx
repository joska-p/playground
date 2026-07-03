import { ToastContainer, useToast } from '@repo/ui/ToastContainer';
import { Button } from '@repo/ui/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => toast.info('Update Available', 'A new version is ready to install.')}
        variant="outline"
        size="sm"
      >
        Show Info
      </Button>
      <Button
        onClick={() => toast.success('Saved!', 'Your project has been saved successfully.')}
        variant="secondary"
        size="sm"
      >
        Show Success
      </Button>
      <Button
        onClick={() => toast.error('Failed', 'An unexpected error occurred.')}
        variant="destructive"
        size="sm"
      >
        Show Error
      </Button>
    </div>
  );
}

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof ToastContainer>;

export const Demo: Story = {
  render: () => (
    <div className="flex min-h-48 items-center justify-center p-8">
      <ToastContainer>
        <ToastDemo />
      </ToastContainer>
    </div>
  )
};
