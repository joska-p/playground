import { renderTreesToPngBlob } from '@repo/randomart-engine/png';
import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Switch } from '@repo/ui/data-entry';
import { useState } from 'react';
import { setCorrelatedRGB } from '../../stores/randomart/actions/display';
import {
  useCorrelatedRGB,
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
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function DisplaySection() {
  const correlatedRGB = useCorrelatedRGB();
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
      const exportR = correlatedRGB ? treeR.args[0] : treeR;
      const exportG = correlatedRGB ? treeR.args[1] : treeG;
      const exportB = correlatedRGB ? treeR.args[2] : treeB;
      if (!exportR || !exportG || !exportB) return;

      const currentTime = randomartStore.getState().time;

      const blob = renderTreesToPngBlob(exportR, exportG, exportB, DOWNLOAD_SIZE, currentTime);
      triggerDownload(blob, filename);
    } catch (err) {
      console.error('Fallback render failed:', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <ControlGrid columns={2}>
      <Switch
        label="correlated RGB"
        checked={correlatedRGB}
        variant="primary"
        onChange={() => {
          setCorrelatedRGB(!correlatedRGB);
        }}
      />
      <Button
        variant="primary"
        disabled={downloading}
        onClick={handleDownload}
        size="sm"
      >
        {downloading ? 'Rendering...' : 'Download PNG'}
      </Button>
    </ControlGrid>
  );
}

export { DisplaySection };
