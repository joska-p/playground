import { Button } from '@repo/ui/Button';
import { useState } from 'react';
import { renderTreesToPngBase64Async } from '../../core/render/png-export';
import {
  setCorrelatedRGB,
  setRenderMode,
  setSeedText,
  setTime,
  toggleRunning
} from '../../stores/randomart/actions';
import { useCorrelatedRGB } from '../../stores/randomart/selectors/useCorrelatedRGB';
import { useRenderMode } from '../../stores/randomart/selectors/useRenderMode';
import { useRunning } from '../../stores/randomart/selectors/useRunning';
import { useSeedText } from '../../stores/randomart/selectors/useSeedText';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors/useTrees';
import { randomartStore } from '../../stores/randomart/store';
import { MaxDepth } from './MaxDepth';
import { SeedInput } from './SeedInput';

const DOWNLOAD_SIZE = 1024;

export function Controls() {
  const [downloading, setDownloading] = useState(false);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();
  const running = useRunning();
  const renderMode = useRenderMode();
  const correlatedRGB = useCorrelatedRGB();

  async function handleDownload() {
    setDownloading(true);
    try {
      const currentTime = randomartStore.getState().time;
      const dataUri = await renderTreesToPngBase64Async(
        treeR,
        treeG,
        treeB,
        DOWNLOAD_SIZE,
        currentTime
      );
      const link = document.createElement('a');
      link.download = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
      link.href = dataUri;
      link.click();
    } catch (err) {
      console.error('Download render failed:', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <SeedInput />
      <MaxDepth />
      <Button
        type="button"
        onClick={() => setSeedText(Math.random().toString(36).slice(2, 10))}
        variant="outline"
        className="w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        Shuffle
      </Button>
      <Button
        type="button"
        onClick={toggleRunning}
        variant="outline"
        className="w-fit"
      >
        {running ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect
                x="6"
                y="4"
                width="4"
                height="16"
              />
              <rect
                x="14"
                y="4"
                width="4"
                height="16"
              />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play
          </>
        )}
      </Button>
      <Button
        type="button"
        onClick={() => setTime(0)}
        variant="outline"
        className="w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Reset Time
      </Button>
      <Button
        type="button"
        onClick={() => setRenderMode(renderMode === 'glsl' ? 'canvas' : 'glsl')}
        variant="outline"
        className="w-fit"
        title={
          renderMode === 'glsl'
            ? 'Switch to CPU (Canvas 2D)'
            : 'Switch to GPU (WebGL)'
        }
      >
        {renderMode === 'glsl' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
            <path d="M9 15h6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
            />
            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
            />
            <path d="M20 13l-4-4-4 4-3-2-5 5" />
          </svg>
        )}
        <span className="text-xs">{renderMode === 'glsl' ? 'GPU' : 'CPU'}</span>
      </Button>
      <Button
        type="button"
        onClick={() => setCorrelatedRGB(!correlatedRGB)}
        variant="outline"
        className="w-fit"
        title={
          correlatedRGB
            ? 'Switch to independent RGB'
            : 'Switch to correlated RGB'
        }
      >
        {correlatedRGB ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A3 3 0 0 1 17 8.24" />
            <path d="M7.15 10.73a3 3 0 0 0-2.39 5.17" />
            <path d="M4 20l3.85-3.85" />
          </svg>
        )}
        <span className="text-xs">{correlatedRGB ? 'Linked' : 'Split'}</span>
      </Button>
      <Button
        type="button"
        onClick={handleDownload}
        variant="primary"
        disabled={downloading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line
            x1="12"
            y1="15"
            x2="12"
            y2="3"
          />
        </svg>
        {downloading ? 'Rendering...' : 'Download PNG'}
      </Button>
    </div>
  );
}
