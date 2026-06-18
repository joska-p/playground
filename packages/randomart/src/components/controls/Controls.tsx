import { Button } from '@repo/ui/Button';
import { renderTreesToPngBase64 } from '../../core/renderer';
import { setSeedText } from '../../stores/randomart/actions';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../../stores/randomart/selectors/useTrees';
import { useSeedText } from '../../stores/randomart/selectors/useSeedText';
import { SeedInput } from './SeedInput';

const DOWNLOAD_SIZE = 1024;

export function Controls() {
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();

  function handleDownload() {
    const dataUri = renderTreesToPngBase64(treeR, treeG, treeB, DOWNLOAD_SIZE);
    const link = document.createElement('a');
    link.download = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
    link.href = dataUri;
    link.click();
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <SeedInput />
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
        onClick={handleDownload}
        variant="primary"
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
        Download PNG
      </Button>
    </div>
  );
}
