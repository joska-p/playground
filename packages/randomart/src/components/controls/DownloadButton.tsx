import { Button } from '@repo/ui/Button';
import { useState } from 'react';
import { renderTreesToPngBlobAsync } from '../../core/render/png-export';
import {
  useCorrelatedRGB,
  useRenderMode,
  useSeedText,
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors';
import { randomartStore } from '../../stores/randomart/store';

const DOWNLOAD_SIZE = 1024;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  // Revoke after a tick so the browser has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DownloadButton() {
  const [downloading, setDownloading] = useState(false);
  const renderMode = useRenderMode();
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const correlatedRGB = useCorrelatedRGB();
  const seedText = useSeedText();

  const filename = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;

  async function handleDownload() {
    setDownloading(true);
    try {
      if (renderMode === 'glsl') {
        // GPU mode: snapshot the live canvas to capture the GLSL shader output
        // including all animation behaviors at the current time.
        const liveCanvas = document.querySelector<HTMLCanvasElement>('canvas');
        const blob = liveCanvas
          ? await new Promise<Blob | null>((resolve) =>
              liveCanvas.toBlob(resolve, 'image/png')
            )
          : null;
        if (blob && blob.size > 0) {
          triggerDownload(blob, filename);
          return;
        }
      }

      // CPU mode (or GPU canvas.toBlob fallback): re-render via the worker pool.
      // Apply the same correlatedRGB transform that RandomArtCanvas uses.
      const exportR = correlatedRGB ? treeR.args[0] : treeR;
      const exportG = correlatedRGB ? treeR.args[1] : treeG;
      const exportB = correlatedRGB ? treeR.args[2] : treeB;
      const currentTime = randomartStore.getState().time;

      const blob = await renderTreesToPngBlobAsync(
        exportR,
        exportG,
        exportB,
        DOWNLOAD_SIZE,
        currentTime
      );
      triggerDownload(blob, filename);
    } catch (err) {
      console.error('Download render failed:', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleDownload}
      variant="primary"
      disabled={downloading}
      className="col-span-2"
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
  );
}
