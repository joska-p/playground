export const MAX_DEVICE_PIXEL_RATIO = 2;

export function defaultDevicePixelRatio(): number {
        return Math.min(window.devicePixelRatio, MAX_DEVICE_PIXEL_RATIO);
}

export type WebGLContextAttributes = {
        alpha?: boolean;
        antialias?: boolean;
        premultipliedAlpha?: boolean;
};

export type CreateWebGLContextConfig = {
        canvas: HTMLCanvasElement;
        webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export type WebGLContext = {
        gl: WebGL2RenderingContext;
        applyDPR(): void;
        reinitialize(): void;
        resize(width?: number, height?: number): void;
        readonly drawingBufferWidth: number;
        readonly drawingBufferHeight: number;
        viewport(): void;
        clear(r?: number, g?: number, b?: number, a?: number): void;
        onContextLost(handler: () => void): () => void;
        onContextRestored(handler: () => void): () => void;
};

export function createWebGLContext({
        canvas,
        webGLContextAttributes
}: CreateWebGLContextConfig): WebGLContext {
        const currentDpr = defaultDevicePixelRatio();

        const gl = canvas.getContext('webgl2', {
                alpha: webGLContextAttributes?.alpha ?? true,
                antialias: webGLContextAttributes?.antialias ?? false,
                premultipliedAlpha: webGLContextAttributes?.premultipliedAlpha ?? true
        });

        if (!gl) throw new Error('WebGL2 not supported');

        const applyDPR = (): void => {
                const w = Math.round(canvas.clientWidth * currentDpr);
                const h = Math.round(canvas.clientHeight * currentDpr);
                canvas.width = w;
                canvas.height = h;
        };

        // Initial sizing
        applyDPR();

        return {
                gl,

                applyDPR,

                reinitialize(): void {
                        applyDPR();
                },

                resize(width?: number, height?: number): void {
                        if (width !== undefined && height !== undefined) {
                                canvas.width = Math.round(width * currentDpr);
                                canvas.height = Math.round(height * currentDpr);
                        } else {
                                applyDPR();
                        }
                },

                get drawingBufferWidth(): number {
                        return gl.drawingBufferWidth;
                },

                get drawingBufferHeight(): number {
                        return gl.drawingBufferHeight;
                },

                viewport(): void {
                        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                },

                clear(r = 0, g = 0, b = 0, a = 1): void {
                        gl.clearColor(r, g, b, a);
                        gl.clear(gl.COLOR_BUFFER_BIT);
                },

                onContextLost(handler: () => void): () => void {
                        const listener = (e: Event) => {
                                e.preventDefault();
                                handler();
                        };
                        canvas.addEventListener('webglcontextlost', listener);
                        return () => {
                                canvas.removeEventListener('webglcontextlost', listener);
                        };
                },

                onContextRestored(handler: () => void): () => void {
                        canvas.addEventListener('webglcontextrestored', handler);
                        return () => {
                                canvas.removeEventListener('webglcontextrestored', handler);
                        };
                }
        };
}
