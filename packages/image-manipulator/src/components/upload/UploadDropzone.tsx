import { cn } from '@repo/ui/cn';
import { UploadIcon } from './UploadIcon';

type UploadDropzoneProps = {
  isDragging: boolean;
  onClick: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function UploadDropzone({
  isDragging,
  onClick,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  inputRef,
  onFileChange,
}: UploadDropzoneProps) {
  return (
    <div
      onClick={onClick}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className={cn(
        'border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer transition-all',
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-border hover:border-primary/50 hover:bg-primary/5'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        hidden
      />
      <UploadIcon />
      <p
        className={cn(
          'text-sm font-medium',
          isDragging ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {isDragging ? 'Drop to upload' : 'Drop image here or click to browse'}
      </p>
      <p className="text-muted-foreground/60 mt-1 text-xs">
        PNG, JPG, WebP — max 50MB
      </p>
    </div>
  );
}

export { UploadDropzone };
