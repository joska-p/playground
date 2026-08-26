import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';

import { Controls } from './controls/Controls';
import { Display } from './display/Display';

function PaletteGenerator() {
    return (
        <Shell className="min-h-dvh">
            <ShellPanels className="flex flex-col gap-3 p-3">
                <Controls />
            </ShellPanels>

            <ShellCanvas className="p-3">
                <Display />
            </ShellCanvas>
        </Shell>
    );
}

export { PaletteGenerator };
