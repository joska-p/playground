import { ControlGrid, Button, Input, Slider, Textarea } from '@repo/tlc/components/forms';

import { setAnimationSpeed, setMaxDepth, setSeedText } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import {
    useAnimationSpeed,
    useMaxDepth,
    useRunning,
    useSeedText
} from '../../stores/randomart/selectors';

function ConfigSection() {
    const seedText = useSeedText();
    const maxDepth = useMaxDepth();
    const running = useRunning();
    const animationSpeed = useAnimationSpeed();

    return (
        <ControlGrid columns={2}>
            <Textarea
                className="col-span-full"
                value={seedText}
                onChange={(e) => {
                    setSeedText(e.target.value);
                }}
            />
            <Button
                size="sm"
                onClick={() => {
                    setSeedText(Math.random().toString(36).slice(2, 10));
                }}
            >
                Randomize
            </Button>

            <Input
                aria-label="Max Depth"
                type="number"
                value={maxDepth}
                onChange={(e) => {
                    setMaxDepth(Number(e.target.value));
                }}
            />

            <Button
                size="sm"
                variant="primary"
                onClick={toggleRunning}
            >
                {running ? 'Pause Animation' : 'Start Animation'}
            </Button>

            <div className="col-span-full flex flex-col gap-1.5">
                <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold">
                    Speed: {animationSpeed.toFixed(2)}x
                </span>
                <Slider
                    min={0.1}
                    max={3}
                    step={0.1}
                    value={animationSpeed}
                    onChange={setAnimationSpeed}
                />
            </div>
        </ControlGrid>
    );
}

export { ConfigSection };
