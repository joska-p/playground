import { createCssColor } from '@repo/glaze/core/types';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { FieldRow, Input } from '@repo/tlc/components/forms';
import { Shell, ShellCanvas, ShellPanels, Panel } from '@repo/tlc/layout';
import { useEffect } from 'react';
import { computeFit, toPixelAligned } from './core/fit';
import { processImage, type PixelTransform } from './core/process';
import { blit, toBlittableImage } from './core/render';
import { fileToImageData } from './core/upload';
import { setOutput, setSource, setSurface, useOutput, useSource } from './stores/store';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

const TRANSFORMS: readonly PixelTransform[] = [];
const BACKGROUND = createCssColor('#000000'); // hoisté, sinon recréé à chaque frame

function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    fileToImageData(file).then(setSource).catch(console.error);
}

function App() {
    const source = useSource();
    const output = useOutput();

    const imageSource = output ? toBlittableImage(output) : null;

    useEffect(() => {
        if (source) setOutput(processImage(source, TRANSFORMS));
    }, [source]);

    function handleOnFrame(surface: CpuSurface) {
        if (!imageSource) return;

        // Lecture de l'état moteur DANS la frame → dimensions fraîches au resize
        const placement = toPixelAligned(computeFit(imageSource, surface));

        surface.clear(BACKGROUND);
        blit(surface, imageSource, placement);
    }

    return (
        <Shell>
            <ShellCanvas>
                <CpuCanvas
                    onMount={setSurface}
                    onFrame={handleOnFrame}
                />
            </ShellCanvas>

            <ShellPanels>
                <Panel>
                    <FieldRow label="Mode">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </FieldRow>
                </Panel>
            </ShellPanels>
        </Shell>
    );
}

export { App };
