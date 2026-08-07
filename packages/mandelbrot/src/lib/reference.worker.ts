import { computeReferenceOrbit } from './reference-orbit';

type OrbitRequest = {
    centerXStr: string; // BigInt mantissa serialized as string
    centerYStr: string;
    prec: number;
    maxIter: number;
};

self.addEventListener('message', (event: MessageEvent<OrbitRequest>) => {
    const { centerXStr, centerYStr, prec, maxIter } = event.data;

    try {
        const orbit = computeReferenceOrbit({
            centerX: { m: BigInt(centerXStr), prec },
            centerY: { m: BigInt(centerYStr), prec },
            maxIter
        });
        self.postMessage(
            { ok: true, data: orbit.data, length: orbit.length },
            { transfer: [orbit.data.buffer] }
        );
    } catch (error) {
        self.postMessage({
            ok: false,
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
