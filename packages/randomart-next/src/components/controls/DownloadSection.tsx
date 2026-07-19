import { evaluate } from '@repo/randomart-engine-next';
import type { Node } from '@repo/randomart-engine-next/types';
import { Button } from '@repo/ui/data-entry';
import { useState } from 'react';
import { useSeedText, useTreeB, useTreeG, useTreeR } from '../../stores/randomart/selectors';

const DOWNLOAD_SIZE = 1024;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function renderTreesToBlob(treeR: Node, treeG: Node, treeB: Node, size: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d context');
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let py = 0; py < size; py++) {
    const y = (py / (size - 1 || 1)) * 2 - 1;
    for (let px = 0; px < size; px++) {
      const x = (px / (size - 1 || 1)) * 2 - 1;
      const r = evaluate(treeR, x, y);
      const g = evaluate(treeG, x, y);
      const b = evaluate(treeB, x, y);
      const idx = (py * size + px) * 4;
      data[idx] = Math.round(((r + 1) / 2) * 255);
      data[idx + 1] = Math.round(((g + 1) / 2) * 255);
      data[idx + 2] = Math.round(((b + 1) / 2) * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob && blob.size > 0) {
        resolve(blob);
      } else {
        reject(new Error('Failed to render PNG'));
      }
    }, 'image/png');
  });
}

function DownloadSection() {
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();
  const [downloading, setDownloading] = useState(false);

  const filename = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;

  function handleDownload() {
    setDownloading(true);

    const liveCanvas = document.querySelector<HTMLCanvasElement>('canvas');
    if (liveCanvas) {
      liveCanvas.toBlob((blob) => {
        if (blob && blob.size > 0) {
          triggerDownload(blob, filename);
          setDownloading(false);
          return;
        }
        fallbackDownload();
      }, 'image/png');
      return;
    }

    fallbackDownload();
  }

  function fallbackDownload() {
    try {
      const exportR = treeR;
      const exportG = treeG;
      const exportB = treeB;

      renderTreesToBlob(exportR, exportG, exportB, DOWNLOAD_SIZE)
        .then((blob) => {
          triggerDownload(blob, filename);
        })
        .catch((err: unknown) => {
          console.error('Fallback render failed:', err);
        })
        .finally(() => {
          setDownloading(false);
        });
    } catch (err) {
      console.error('Fallback render failed:', err);
      setDownloading(false);
    }
  }

  return (
    <Button
      variant="primary"
      disabled={downloading}
      onClick={handleDownload}
      size="sm"
    >
      {downloading ? '...' : 'png'}
    </Button>
  );
}

export { DownloadSection };
