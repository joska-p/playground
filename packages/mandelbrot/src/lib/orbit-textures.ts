/**
 * Fixed-width RG32F texture holding the reference orbit the perturbation shader samples (RG = (Zx,
 * Zy) per texel).
 *
 * Owns the texture's lifetime for the given GL context. Uploads reuse the buffer via
 * `texSubImage2D` when the orbit still fits in the current row count; only a longer orbit forces a
 * reallocation (`texImage2D`). Pass the raw `WebGLTexture` as the `uRef` uniform and let glaze bind
 * it.
 */

export const REF_TEX_WIDTH = 2048;

export type OrbitTexture = {
    readonly texture: WebGLTexture;
    upload(data: Float32Array, count: number): void;
    dispose(): void;
};

export function createOrbitTexture(gl: WebGL2RenderingContext): OrbitTexture {
    let tex: WebGLTexture | null = null;
    let height = 0;

    const alloc = (data: Float32Array, w: number, h: number): WebGLTexture => {
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, w, h, 0, gl.RG, gl.FLOAT, data);
        return t;
    };

    return {
        get texture(): WebGLTexture {
            if (!tex) throw new Error('orbit texture not ready');
            return tex;
        },

        upload(data, count): void {
            const w = REF_TEX_WIDTH;
            const h = Math.max(1, Math.ceil(count / w));
            // Pad to width*height texels (RG = 2 floats each).
            const padded = new Float32Array(w * h * 2);
            padded.set(data.subarray(0, count * 2));

            if (tex && h === height) {
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, w, h, gl.RG, gl.FLOAT, padded);
                return;
            }
            if (tex) gl.deleteTexture(tex);
            tex = alloc(padded, w, h);
            height = h;
        },

        dispose(): void {
            if (tex) gl.deleteTexture(tex);
            tex = null;
            height = 0;
        }
    };
}
