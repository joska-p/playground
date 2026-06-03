import { useCallback, useRef, useState } from "react";
import { useImageUpload } from "../../hooks/useImageUpload";
import { usePipelineFileName, usePipelineImageSource } from "../../store/pipelineStore";
import { UploadDropzone } from "../molecules/UploadDropzone";
import { UploadedPreview } from "../molecules/UploadedPreview";

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
    [handleFileDrop]
  );

  if (imageSource) {
    return <UploadedPreview imageSource={imageSource} fileName={fileName} onClear={clearImage} />;
  }

  return (
    <UploadDropzone
      isDragging={isDragging}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      inputRef={inputRef}
      onFileChange={handleImageUpload}
    />
  );
}

export { UploadZone };
