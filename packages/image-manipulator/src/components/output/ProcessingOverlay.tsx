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
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-sm">Processing&hellip;</p>
      </div>
    </div>
  );
}

export { ProcessingOverlay };
