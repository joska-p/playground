import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { FieldRow, Input } from '@repo/tlc/components/forms';
import { Shell, ShellCanvas, ShellPanels, Panel } from '@repo/tlc/layout';
import { useState } from 'react';
import { calculateImageDimensions, drawImageToCanvas } from './core/utils';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

function App() {
    const [surface, setSurface] = useState<CpuSurface | null>(null);

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file || !surface) return;

        console.log('file', file);
        console.log('surface', surface);

        const { canvas, context } = surface;
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target) return;

            const imageFile = e.target.result as string;
            const image = new Image();

            image.src = imageFile;

            const dimensions = calculateImageDimensions(
                image.width,
                image.height,
                canvas.width,
                canvas.height
            );

            drawImageToCanvas(context, image, dimensions);
        };
        reader.readAsDataURL(file);
    }

    return (
        <Shell>
            <ShellCanvas>
                <CpuCanvas onMount={setSurface} />
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
