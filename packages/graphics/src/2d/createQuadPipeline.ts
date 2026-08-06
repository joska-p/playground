import {
    compileShaderProgram,
    setUniformValue,
    warnUnknownUniform
} from '../core/compileShaderProgram';
import type { UniformEntry, UniformValue } from '../core/compileShaderProgram';

export type QuadPipeline = {
    compileFragmentShader(fragmentSource: string): void;
    reinitialize(fragmentSource?: string): void;
    render(): void;
    setUniforms(uniformValues: Record<string, UniformValue>): void;
    hasUniform(name: string): boolean;
    dispose(): void;
};

export function createQuadPipeline(gl: WebGL2RenderingContext): QuadPipeline {
    let program: WebGLProgram | null = null;
    let currentSource: string | null = null;
    let uniforms = new Map<string, UniformEntry>();
    let nextTextureUnit = 0;
    let vao: WebGLVertexArrayObject | null = gl.createVertexArray();

    return {
        compileFragmentShader(fragmentSource: string): void {
            const compiled = compileShaderProgram(gl, fragmentSource);
            if (program) gl.deleteProgram(program);
            program = compiled.program;
            uniforms = compiled.uniforms;
            currentSource = fragmentSource;
        },

        reinitialize(fragmentSource?: string): void {
            const source = fragmentSource ?? currentSource;
            if (source === null) {
                throw new Error(
                    'QuadPipeline.reinitialize() called before any shader was compiled'
                );
            }
            gl.deleteVertexArray(vao);
            vao = gl.createVertexArray();
            this.compileFragmentShader(source);
        },

        render(): void {
            if (!program) {
                throw new Error('QuadPipeline.render() called with no compiled program');
            }

            nextTextureUnit = 0;
            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        },

        setUniforms(uniformValues: Record<string, UniformValue>): void {
            if (!program) {
                throw new Error('QuadPipeline.setUniforms() called with no compiled program');
            }
            gl.useProgram(program);
            for (const [name, value] of Object.entries(uniformValues)) {
                const entry = uniforms.get(name);
                if (entry === undefined) {
                    warnUnknownUniform(name);
                    continue;
                }
                setUniformValue(gl, entry, value, () => nextTextureUnit++);
            }
        },

        hasUniform(name: string): boolean {
            return uniforms.has(name);
        },

        dispose(): void {
            if (program) {
                gl.deleteProgram(program);
                program = null;
            }
            gl.deleteVertexArray(vao);
            vao = null;
        }
    };
}
