import { useCallback, useEffect, useRef, useState } from "react";
import { renderCompareSlider } from "./compareSliderRenderer";

type UseCompareSliderArgs = {
  source: ImageData;
  result: ImageData;
};

export function useCompareSlider({ source, result }: UseCompareSliderArgs) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const offscreenRef = useRef<{ source: HTMLCanvasElement; result: HTMLCanvasElement } | null>(
    null
  );
  const prevSourceRef = useRef<ImageData | null>(null);
  const prevResultRef = useRef<ImageData | null>(null);

  const width = source.width;
  const height = source.height;

  useEffect(() => {
    const needsRebuild =
      !offscreenRef.current || prevSourceRef.current !== source || prevResultRef.current !== result;

    if (needsRebuild) {
      const s = document.createElement("canvas");
      s.width = source.width;
      s.height = source.height;
      s.getContext("2d")!.putImageData(source, 0, 0);

      const r = document.createElement("canvas");
      r.width = result.width;
      r.height = result.height;
      r.getContext("2d")!.putImageData(result, 0, 0);

      offscreenRef.current = { source: s, result: r };
      prevSourceRef.current = source;
      prevResultRef.current = result;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!offscreenRef.current) return;
    const { source: srcCanvas, result: resCanvas } = offscreenRef.current;

    renderCompareSlider({
      ctx,
      srcCanvas,
      resCanvas,
      sliderPos,
      width,
      height,
    });
  }, [source, result, sliderPos, width, height]);

  const updateSliderPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updateSliderPosition(e.touches[0].clientX);
    },
    [updateSliderPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      updateSliderPosition(e.touches[0].clientX);
    },
    [updateSliderPosition]
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateSliderPosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateSliderPosition]);

  return {
    containerRef,
    canvasRef,
    width,
    height,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
