import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { getModule } from '../core/registry';

export function NaturalsDemo() {
    const module = getModule('naturals');
    const signal = module.createSignal({ maxTerms: 1000 });

    return (
        <CpuCanvas
            style={{ width: '100%', height: 400, background: 'black' }}
            onDraw={(surface) => {
                const next = signal.next();
                if (next.done) return;
                const x = next.value;
                const y = x;
                surface.circle(x, y, 5, 'red');
            }}
        />
    );
}
