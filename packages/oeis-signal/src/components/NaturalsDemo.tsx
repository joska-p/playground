import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { getModule } from '../core/registry';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';

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
                drawCircle(surface.context, { fill: 'red' }, { x, y }, 5);
            }}
        />
    );
}
