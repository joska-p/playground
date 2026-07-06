import { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  type DialogHandle
} from '../..';
import { DemoSection } from '../layout/DemoSection';

export function DialogDemo() {
  const dialogRef = useRef<DialogHandle>(null);
  return (
    <DemoSection
      id="component-dialog"
      title="Dialog"
      intro="Wraps native &lt;dialog&gt;. The ref exposes open/close via useImperativeHandle. Focus trapping, Esc-to-close, and ::backdrop blur are all native."
      apiRows={[
        {
          prop: 'ref',
          type: 'Ref<DialogHandle>',
          default: 'required',
          notes: '{ open(), close() }'
        },
        { prop: 'onClose', type: '() => void', default: '—' },
        {
          prop: 'DialogActions variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'confirm button color'
        }
      ]}
      code={`const ref = useRef<DialogHandle>(null);
<Button onClick={() => ref.current?.open()}>open</Button>
<Dialog ref={ref}>
  <DialogBody>
    <DialogTitle>title</DialogTitle>
    <DialogDescription>description</DialogDescription>
  </DialogBody>
  <DialogActions dialogRef={ref} />
</Dialog>`}
    >
      <Button onClick={() => dialogRef.current?.open()}>open dialog</Button>
      <Dialog ref={dialogRef}>
        <DialogBody>
          <DialogTitle>confirm action</DialogTitle>
          <DialogDescription>
            are you sure? this will apply changes and notify collaborators.
          </DialogDescription>
        </DialogBody>
        <DialogActions
          dialogRef={dialogRef}
          variant="primary"
        />
      </Dialog>
    </DemoSection>
  );
}
