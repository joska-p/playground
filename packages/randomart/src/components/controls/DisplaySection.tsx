import { renderTreesToPngBlob } from '@repo/randomart-engine/png';
import { Button, FieldRow, Toggle } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';
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
                } else {
                    const b = renderTreesToPngBlob(
                        treeR,
                        treeG,
                        treeB,
                        DOWNLOAD_SIZE,
                        randomartStore.getState().time
                    );

                    triggerDownload(b, filename);
                    setDownloading(false);
                }
            });
        } else {
            const b = renderTreesToPngBlob(
                treeR,
                treeG,
                treeB,
                DOWNLOAD_SIZE,
                randomartStore.getState().time
            );

            triggerDownload(b, filename);
            setDownloading(false);
        }
    }

    return (
        <PanelSection label="display">
            <FieldRow label="Correlated RGB">
                <Toggle
                    pressed={correlatedRGB}
                    onChange={(pressed) => {
                        setCorrelatedRGB(pressed);
                    }}
                    aria-label="Correlated RGB"
                />
            </FieldRow>
            <Button
                size="sm"
                variant="default"
                disabled={downloading}
                onClick={handleDownload}
            >
                {downloading
                    ? 'Rendering PNG...'
                    : `Download ${String(DOWNLOAD_SIZE)}×${String(DOWNLOAD_SIZE)} PNG`}
            </Button>
        </PanelSection>
    );
}

export { DisplaySection };
