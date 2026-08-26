import { createPositiveNumber, createCssColor } from '@repo/glaze/core/types';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { getModule } from '../core/registry';

export function NaturalsDemo() {
    const module = getModule('naturals');
    const signal = module.createSignal({ maxTerms: 1000 });

    return (
        <CpuCanvas
            style={{ width: '100%', height: 400, background: 'black' }}
            onFrame={(surface) => {
                const next = signal.next();

                if (next.done) return;

                const x = next.value;
                const y = x;

                surface.circle(x, y, createPositiveNumber(5), createCssColor('red'));
            }}
        />
    );
}
