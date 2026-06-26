import { render } from '@repo/sequence-engine/visualizations/render';
import type {
  CanvasViewport,
  LayerConfigEntry
} from '@repo/sequence-engine/visualizations/types';
import { useCallback, useEffect, useRef } from 'react';
import { useIsPlaying } from '../stores/sequence/selectors/useIsPlaying';

export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sequence: number[],
  layers: LayerConfigEntry[],
  viewport: CanvasViewport
): void {
  const sequenceRef = useRef(sequence);
  const layersRef = useRef(layers);
  const viewportRef = useRef(viewport);
  const isPlayingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const isPlaying = useIsPlaying();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    render(canvas, sequenceRef.current, layersRef.current, viewportRef.current, isPlayingRef.current);
  }, [canvasRef]);

  // Keep refs in sync for rAF reads
  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Sequence/layers change → render immediately
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, layers]);

  // Viewport change → throttle via rAF
  useEffect(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      draw();
      rafRef.current = null;
    });
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport]);

  // Playback / worker redraw requests → render immediately
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function onRequestDraw() {
      draw();
    }
    canvas.addEventListener('sequence-renderer:request-draw', onRequestDraw);
    return () => {
      canvas.removeEventListener('sequence-renderer:request-draw', onRequestDraw);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
