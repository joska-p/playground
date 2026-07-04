import {
  useImperativeHandle,
  useRef,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import type { ColorVariant } from "../lib/colorVariant";

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export interface DialogProps {
  children: ReactNode;
  className?: string;
  /** Called when the dialog closes for any reason (Esc, backdrop, button). */
  onClose?: () => void;
  ref?: Ref<DialogHandle>;
}

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
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "self-center justify-self-center dialog-modal bg-surface w-full max-w-md rounded-lg p-0",
        className
      )}
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      {children}
    </dialog>
  );
}

export function DialogBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-foreground text-[15px] font-medium mb-2", className)}>{children}</h3>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-foreground-muted text-[13px] leading-relaxed", className)}>{children}</p>
  );
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex justify-end gap-2 px-5 py-3 bg-surface-raised/50 rounded-b-lg",
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
  cancelLabel = "cancel",
  confirmLabel = "confirm",
  variant = "primary",
}: {
  dialogRef: RefObject<DialogHandle | null>;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  variant?: ColorVariant;
}) {
  return (
    <DialogFooter>
      <Button variant="ghost" size="sm" onClick={() => dialogRef.current?.close()}>
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
