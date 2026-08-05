import {
        compileProgram,
        type CompiledShaderProgram,
        type UniformEntry,
        type UniformValue,
        FULLSCREEN_TRIANGLE
} from './compileProgram';
import { setUniforms } from './setUniforms';

export type Program = {
        readonly program: WebGLProgram;
        readonly uniforms: Map<string, UniformEntry>;
        use(): void;
        setUniforms(values: Record<string, UniformValue>): void;
        render(): void;
        reinitialize(): void;
        destroy(): void;
};

export function createProgram(
        gl: WebGL2RenderingContext,
        fragmentSource: string,
        vertexSource: string = FULLSCREEN_TRIANGLE
): Program {
        let compiled: CompiledShaderProgram = compileProgram(gl, fragmentSource, vertexSource);
        let vao: WebGLVertexArrayObject | null = gl.createVertexArray();
        let nextTextureUnit = 0;
        let destroyed = false;

        return {
                get program(): WebGLProgram {
                        return compiled.program;
                },

                get uniforms(): Map<string, UniformEntry> {
                        return compiled.uniforms;
                },

                use(): void {
                        gl.useProgram(compiled.program);
                        gl.bindVertexArray(vao);
                },

                setUniforms(values: Record<string, UniformValue>): void {
                        gl.useProgram(compiled.program);
                        setUniforms(gl, compiled.uniforms, values, () => nextTextureUnit++);
                },

                render(): void {
                        nextTextureUnit = 0;
                        gl.useProgram(compiled.program);
                        gl.bindVertexArray(vao);
                        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                        gl.drawArrays(gl.TRIANGLES, 0, 3);
                },

                reinitialize(): void {
                        if (destroyed) return;
                        gl.deleteProgram(compiled.program);
                        if (vao) gl.deleteVertexArray(vao);
                        compiled = compileProgram(gl, fragmentSource, vertexSource);
                        vao = gl.createVertexArray();
                },

                destroy(): void {
                        if (destroyed) return;
                        destroyed = true;
                        gl.deleteProgram(compiled.program);
                        if (vao) gl.deleteVertexArray(vao);
                        vao = null;
                }
        };
}
