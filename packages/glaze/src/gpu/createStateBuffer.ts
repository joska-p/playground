import { createProgram, type Program } from './shader/createProgram';
import type { UniformValue } from './shader/compileProgram';

/**
 * Ping-pong render targets: two RGBA8 textures each attached to their own
 * framebuffer. `step()` renders into the write target while sampling the read
 * target, then swaps them so the result becomes the input of the next step.
 */
export type StateBufferTargets = {
    readonly width: number;
    readonly height: number;
    bindWrite(): void;
    unbind(): void;
    getReadTexture(): WebGLTexture;
    getWriteTexture(): WebGLTexture;
    swap(): void;
    init(data: Uint8Array): void;
    resize(width: number, height: number): void;
    destroy(): void;
};

function createStateBufferTargets(
    gl: WebGL2RenderingContext,
    initialWidth: number,
    initialHeight: number
): StateBufferTargets {
    let pingPong = 0;
    let currentWidth = initialWidth;
    let currentHeight = initialHeight;
    let textures: WebGLTexture[] = [];
    let framebuffers: WebGLFramebuffer[] = [];

    const createTarget = (width: number, height: number): [WebGLTexture, WebGLFramebuffer] => {
        const texture = gl.createTexture();
        // even with WebGL2, createTexture can return null if the context is lost or if there are insufficient resources.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!texture) {
            throw new Error('Glaze: StateBuffer texture creation failed');
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA8,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const fbo = gl.createFramebuffer();
        // even with WebGL2, createFramebuffer can return null if the context is lost or if there are insufficient resources.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!fbo) {
            gl.deleteTexture(texture);
            throw new Error('Glaze: StateBuffer framebuffer creation failed');
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            gl.deleteTexture(texture);
            gl.deleteFramebuffer(fbo);
            throw new Error(
                `Glaze: StateBuffer framebuffer incomplete (${String(width)}x${String(height)})`
            );
        }

        return [texture, fbo];
    };

    const createTargetPair = (width: number, height: number): void => {
        const created: [WebGLTexture, WebGLFramebuffer][] = [];
        try {
            created.push(createTarget(width, height));
            created.push(createTarget(width, height));
            textures = created.map(([texture]) => texture);
            framebuffers = created.map(([, fbo]) => fbo);
        } catch (error) {
            for (const [texture, fbo] of created) {
                gl.deleteTexture(texture);
                gl.deleteFramebuffer(fbo);
            }
            throw error;
        } finally {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    };

    const destroyTargetPair = (): void => {
        for (const texture of textures) gl.deleteTexture(texture);
        for (const fbo of framebuffers) gl.deleteFramebuffer(fbo);
        textures = [];
        framebuffers = [];
    };

    const writeIndex = (): number => (pingPong === 0 ? 0 : 1);
    const readIndex = (): number => (pingPong === 0 ? 1 : 0);

    createTargetPair(initialWidth, initialHeight);

    return {
        get width(): number {
            return currentWidth;
        },

        get height(): number {
            return currentHeight;
        },

        bindWrite(): void {
            const fbo = framebuffers[writeIndex()];
            if (!fbo) throw new Error('Glaze: StateBuffer write target not initialized');
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.viewport(0, 0, currentWidth, currentHeight);
        },

        unbind(): void {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        },

        getReadTexture(): WebGLTexture {
            const texture = textures[readIndex()];
            if (!texture) throw new Error('Glaze: StateBuffer read target not initialized');
            return texture;
        },

        getWriteTexture(): WebGLTexture {
            const texture = textures[writeIndex()];
            if (!texture) throw new Error('Glaze: StateBuffer write target not initialized');
            return texture;
        },

        swap(): void {
            pingPong = 1 - pingPong;
        },

        init(data: Uint8Array): void {
            if (data.length !== currentWidth * currentHeight) {
                throw new Error(
                    `Glaze: StateBuffer init data length ${String(data.length)} does not match ${String(currentWidth)}x${String(currentHeight)} cells`
                );
            }

            const rgba = new Uint8Array(data.length * 4);
            for (let i = 0; i < data.length; i++) {
                const cell = data[i] ?? 0;
                const j = i * 4;
                rgba[j] = cell;
                rgba[j + 1] = 0;
                rgba[j + 2] = 0;
                rgba[j + 3] = 255;
            }

            for (const texture of textures) {
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texSubImage2D(
                    gl.TEXTURE_2D,
                    0,
                    0,
                    0,
                    currentWidth,
                    currentHeight,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    rgba
                );
            }
        },

        resize(width: number, height: number): void {
            if (width === currentWidth && height === currentHeight) return;
            destroyTargetPair();
            createTargetPair(width, height);
            currentWidth = width;
            currentHeight = height;
            pingPong = 0;
        },

        destroy(): void {
            destroyTargetPair();
        }
    };
}

/**
 * A GPU state buffer: a ping-pong texture pair holding evolving state, plus
 * the fullscreen-triangle programs that step it. Each `step()` renders the
 * active program into the write target while sampling the previous state via
 * the `u_state` sampler (bound to texture unit 0), then swaps the pair.
 *
 * The typical flow is `init(data)` → `useProgram(name)` → `setUniforms(values)`
 * → `step()`, reading the live state back with `getTexture()`.
 */
export type StateBuffer = {
    readonly width: number;
    readonly height: number;
    readonly targets: StateBufferTargets;
    addProgram(name: string, fragmentSource: string): void;
    useProgram(name: string): void;
    setUniforms(values: Record<string, UniformValue>): void;
    step(): void;
    init(data: Uint8Array): void;
    getTexture(): WebGLTexture;
    resize(width: number, height: number): void;
    destroy(): void;
};

export function createStateBuffer(
    gl: WebGL2RenderingContext,
    width: number,
    height: number
): StateBuffer {
    const targets = createStateBufferTargets(gl, width, height);
    const programs = new Map<string, Program>();
    let activeName: string | null = null;

    const activeProgram = (): Program => {
        const program = programs.get(activeName ?? 'default');
        if (!program)
            throw new Error(`Glaze: StateBuffer program "${activeName ?? 'default'}" not found`);
        return program;
    };

    return {
        targets,

        get width(): number {
            return targets.width;
        },

        get height(): number {
            return targets.height;
        },

        addProgram(name: string, fragmentSource: string): void {
            const prior = programs.get(name);
            if (prior) prior.destroy();
            programs.set(name, createProgram(gl, fragmentSource));
        },

        useProgram(name: string): void {
            if (!programs.has(name))
                throw new Error(`Glaze: StateBuffer program "${name}" not found`);
            activeName = name;
        },

        setUniforms(values: Record<string, UniformValue>): void {
            activeProgram().setUniforms(values);
        },

        step(): void {
            const program = activeProgram();
            program.use();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, targets.getReadTexture());
            targets.bindWrite();
            const stateEntry = program.uniforms.get('u_state');
            if (stateEntry) {
                gl.uniform1i(stateEntry.location, 0);
            }
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            targets.unbind();
            targets.swap();
        },

        init(data: Uint8Array): void {
            targets.init(data);
        },

        getTexture(): WebGLTexture {
            return targets.getReadTexture();
        },

        resize(nextWidth: number, nextHeight: number): void {
            targets.resize(nextWidth, nextHeight);
        },

        destroy(): void {
            for (const program of programs.values()) {
                program.destroy();
            }
            programs.clear();
            targets.destroy();
        }
    };
}
