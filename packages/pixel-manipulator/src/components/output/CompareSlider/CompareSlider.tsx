import { useCompareSlider } from './useCompareSlider';

type CompareSliderProps = {
  source: ImageData;
  result: ImageData;
};

function CompareSlider({ source, result }: CompareSliderProps) {
  const {
    containerRef,
    canvasRef,
    width,
    height,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useCompareSlider({ source, result });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden rounded-lg select-none"
      style={{
        width: '100%',
        maxWidth: width,
        aspectRatio: `${String(width)} / ${String(height)}`,
        cursor: 'ew-resize'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}

export { CompareSlider };
