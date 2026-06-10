import {
  useImageSource,
  useIsProcessing,
} from '../../stores/manipulator/selectors';

function ProcessingOverlay() {
  const isProcessing = useIsProcessing();
  const imageSource = useImageSource();

  if (!isProcessing || !imageSource) {
    return null;
  }

  return (
    <div
      className="bg-background/80 absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      <p className="text-muted-foreground text-sm">Processing&hellip;</p>
    </div>
  );
}

export { ProcessingOverlay };
