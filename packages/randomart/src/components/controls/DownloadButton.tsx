import { Button } from '@repo/ui/Button';
import { useState } from 'react';
import { renderTreesToPngBase64Async } from '../../core/render/png-export';
import { useSeedText } from '../../stores/randomart/selectors';
import { useTreeB } from '../../stores/randomart/selectors';
import { useTreeG } from '../../stores/randomart/selectors';
import { useTreeR } from '../../stores/randomart/selectors';
import { randomartStore } from '../../stores/randomart/store';

const DOWNLOAD_SIZE = 1024;

export function DownloadButton() {
  const [downloading, setDownloading] = useState(false);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();

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
  );
}
