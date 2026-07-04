import { useImperativeHandle, useRef, type ReactNode, type Ref, type RefObject } from 'react';
import { cn } from '../../../lib/cn';
import type { ColorVariant } from '../../../lib/colorVariant';
import { Button } from '../../data-entry/button/Button';

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

export type DialogProps = {
  children: ReactNode;
  className?: string;
  /** Called when the dialog closes for any reason (Esc, backdrop, button). */
  onClose?: () => void;
  ref?: Ref<DialogHandle>;
};

/**
 * Dialog — wraps the native <dialog> element exactly as the source design's
 * conversion guide prescribes: "useRef → .showModal()/.close(). ::backdrop
 * auto-applies." Focus trapping, Esc-to-close, and the backdrop are all
 * handled natively by the browser. React 19 lets `useImperativeHandle`
 * attach straight to the `ref` prop — no `forwardRef` wrapper required.
 * The component holds no React state of its own; open/closed state lives
 * entirely in the DOM via the native dialog element.
 */
export function Dialog({ children, className, onClose, ref }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close()
  }));

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        'dialog-modal bg-surface w-full max-w-md self-center justify-self-center rounded-lg p-0',
        className
      )}
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {children}
    </dialog>
  );
}

export function DialogBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-foreground mb-2 text-[15px] font-medium', className)}>{children}</h3>
  );
}

export function DialogDescription({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-foreground-muted text-[13px] leading-relaxed', className)}>{children}</p>
  );
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'bg-surface-raised/50 flex justify-end gap-2 rounded-b-lg px-5 py-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Convenience footer with cancel/confirm wired to a DialogHandle ref. */
export function DialogActions({
  dialogRef,
  onConfirm,
  cancelLabel = 'cancel',
  confirmLabel = 'confirm',
  variant = 'primary'
}: {
  dialogRef: RefObject<DialogHandle | null>;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  variant?: ColorVariant;
}) {
  return (
    <DialogFooter>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dialogRef.current?.close()}
      >
        {cancelLabel}
      </Button>
      <Button
        variant={variant}
        size="sm"
        onClick={() => {
          onConfirm?.();
          dialogRef.current?.close();
        }}
      >
        {confirmLabel}
      </Button>
    </DialogFooter>
  );
}
