import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { FieldRow, Input } from '@repo/tlc/components/forms';
import { Shell, ShellCanvas, ShellPanels, Panel } from '@repo/tlc/layout';
import { useImageUpload } from './hooks/useImageUpload';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

function App() {
    const [imageFile, handleImageUpload] = useImageUpload();

    function handleOnMount(surface: CpuSurface) {
        console.log('file: ', imageFile);
        console.log('surface: ', surface);
        // do stuff
    }

    return (
        <Shell>
            <ShellCanvas>
                <CpuCanvas onMount={handleOnMount} />
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
