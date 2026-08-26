import { ControlGrid, Button, FieldRow, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import {
    setChroma,
    setDivisions,
    setIsPlaying,
    setLightness,
    useChroma,
    useDivisions,
    useIsPlaying,
    useLightness
} from './store';

function ManualControls() {
    const divisions = useDivisions();
    const chroma = useChroma();
    const lightness = useLightness();
    const isPlaying = useIsPlaying();

    function handlePlay() {
        setIsPlaying(!isPlaying);
    }

    return (
        <>
            <PanelSection label="manual">
                <FieldRow label={`div: ${String(divisions)}`}>
                    <Slider
                        value={divisions}
                        onChange={setDivisions}
                        min={1}
                        max={100}
                        step={1}
                    />
                </FieldRow>

                <FieldRow label="Chroma">
                    <Slider
                        value={chroma}
                        onChange={setChroma}
                        min={0}
                        max={0.4}
                        step={0.01}
                    />
                </FieldRow>

                <FieldRow label="Lightness">
                    <Slider
                        value={lightness}
                        onChange={setLightness}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </FieldRow>

                <ControlGrid columns={2}>
                    <Button onClick={handlePlay}>{isPlaying ? 'Stop' : 'Play'}</Button>
                </ControlGrid>
            </PanelSection>
        </>
    );
}

export { ManualControls };
