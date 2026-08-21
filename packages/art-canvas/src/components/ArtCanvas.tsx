import { ControlsPanel } from './controls/ControlsPanel';
import { Atlas } from '../modules/atlas/Atlas';
import { FoldedSpace } from '../modules/folded-space/FoldedSpace';
import { Manual } from '../modules/manual/Manual';
import { SeedCanvas } from '../modules/seed/SeedCanvas';
import { Spirale } from '../modules/spirale/Spirale';
import { useInputMode } from '../stores/ui/store';

export function ArtCanvas() {
    const inputMode = useInputMode();

    return (
        <>
            <ControlsPanel />
            {inputMode === 'spirale' && <Spirale />}
            {inputMode === 'seed' && <SeedCanvas />}
            {inputMode === 'folded-space' && <FoldedSpace />}
            {inputMode === 'atlas' && <Atlas />}
            {inputMode === 'manual' && <Manual />}
        </>
    );
}
