import { Button } from "@repo/ui/Button";
import { cn } from "@repo/ui/cn";
import { useCallback, useRef, useState } from "react";
import { useImageUpload } from "../../../hooks/useImageUpload";
import { usePipelineFileName, usePipelineImageSource } from "../../../store/pipelineStore";

function UploadIcon() {
  return (
    <svg
      className="text-muted-foreground mx-auto mb-3 h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function UploadZone() {
  const { handleImageUpload, handleFileDrop, clearImage } = useImageUpload();
  const imageSource = usePipelineImageSource();
  const fileName = usePipelineFileName();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const file = e.dataTransfer.files?.[0];
      if (file) handleFileDrop(file);
    },
    [handleFileDrop],
  );

  if (imageSource) {
    return (
      <div className="border-border bg-card flex items-center gap-3 rounded-lg border p-3">
        <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
          <canvas
            ref={(el) => {
              if (el) {
                el.width = imageSource.imageData.width;
                el.height = imageSource.imageData.height;
                const ctx = el.getContext("2d");
                if (ctx) ctx.putImageData(imageSource.imageData, 0, 0);
              }
            }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-medium">{fileName ?? "image"}</p>
          <p className="text-muted-foreground text-xs">
            {imageSource.imageData.width} × {imageSource.imageData.height}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={clearImage} aria-label="Remove image" className="shrink-0">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className={cn(
        "border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer transition-all",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleImageUpload} hidden />
      <UploadIcon />
      <p
        className={cn(
          "text-sm font-medium",
          isDragging ? "text-primary" : "text-muted-foreground",
        )}
      >
        {isDragging ? "Drop to upload" : "Drop image here or click to browse"}
      </p>
      <p className="text-muted-foreground/60 mt-1 text-xs">PNG, JPG, WebP — max 50MB</p>
    </div>
  );
}

export { UploadZone };
