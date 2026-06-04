import { UploadDropzone } from '../UploadDropzone';
import { UploadedPreview } from '../UploadedPreview';
import { useUploadZone } from './useUploadZone';

function UploadZone() {
  const {
    imageSource,
    fileName,
    isDragging,
    inputRef,
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleImageUpload,
    clearImage,
  } = useUploadZone();

  if (imageSource) {
    return (
      <UploadedPreview
        imageSource={imageSource}
        fileName={fileName}
        onClear={clearImage}
      />
    );
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
