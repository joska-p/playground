import { Button } from '@repo/ui/data-entry';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle
} from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      control: { type: 'select' }
    },
    open: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => setOpen(true)}
          variant="primary"
          size="sm"
        >
          Open Dialog
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogBody>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed with this action?
            </DialogDescription>
          </DialogBody>

          <DialogActions
            open={open}
            onOpenChange={setOpen}
            onConfirm={() => console.log('Action confirmed')}
            confirmLabel="Confirm"
            cancelLabel="Cancel"
          />
        </Dialog>
      </div>
    );
  }
};

export const Variants: Story = {
  render: () => {
    const [openPrimary, setOpenPrimary] = useState(false);
    const [openSecondary, setOpenSecondary] = useState(false);
    const [openAccent, setOpenAccent] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
      <div className="flex min-h-48 items-center justify-center gap-3">
        <Button
          onClick={() => setOpenPrimary(true)}
          variant="primary"
          size="sm"
        >
          Primary
        </Button>

        <Button
          onClick={() => setOpenSecondary(true)}
          variant="secondary"
          size="sm"
        >
          Secondary
        </Button>

        <Button
          onClick={() => setOpenAccent(true)}
          variant="accent"
          size="sm"
        >
          Pro Tip
        </Button>

        <Button
          onClick={() => setOpenWarning(true)}
          variant="warning"
          size="sm"
        >
          Storage Warning
        </Button>

        <Button
          onClick={() => setOpenDelete(true)}
          variant="destructive"
          size="sm"
        >
          Delete Project
        </Button>

        <Dialog
          open={openPrimary}
          onClose={() => setOpenPrimary(false)}
        >
          <DialogBody>
            <DialogTitle>Did you know?</DialogTitle>
            <DialogDescription>
              You can drag and drop images directly onto the canvas to use them as texture sources.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            open={openPrimary}
            onOpenChange={setOpenPrimary}
            confirmLabel="Got it"
            cancelLabel="Show again"
            variant="primary"
          />
        </Dialog>

        <Dialog
          open={openSecondary}
          onClose={() => setOpenSecondary(false)}
        >
          <DialogBody>
            <DialogTitle>Did you know?</DialogTitle>
            <DialogDescription>
              You can drag and drop images directly onto the canvas to use them as texture sources.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            open={openSecondary}
            onOpenChange={setOpenSecondary}
            confirmLabel="Got it"
            cancelLabel="Show again"
            variant="secondary"
          />
        </Dialog>

        {/* Pro Tip Dialog */}
        <Dialog
          open={openAccent}
          onClose={() => setOpenAccent(false)}
        >
          <DialogBody>
            <DialogTitle>Did you know?</DialogTitle>
            <DialogDescription>
              You can drag and drop images directly onto the canvas to use them as texture sources.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            open={openAccent}
            onOpenChange={setOpenAccent}
            confirmLabel="Got it"
            cancelLabel="Show again"
            variant="accent"
          />
        </Dialog>

        {/* Storage Warning Dialog */}
        <Dialog
          open={openWarning}
          onClose={() => setOpenWarning(false)}
        >
          <DialogBody>
            <DialogTitle>Storage limit reached</DialogTitle>
            <DialogDescription>
              You are at 95% capacity. Please free up space to continue creating.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            variant="warning"
            open={openWarning}
            onOpenChange={setOpenWarning}
            confirmLabel="Manage Storage"
            cancelLabel="Dismiss"
          />
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
        >
          <DialogBody>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              This will permanently delete all files and cannot be undone.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            open={openDelete}
            onOpenChange={setOpenDelete}
            onConfirm={() => console.log('Delete confirmed')}
            confirmLabel="Delete"
            cancelLabel="Keep"
            variant="destructive"
          />
        </Dialog>
      </div>
    );
  }
};
