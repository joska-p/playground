export type FBOManager = {
  readonly width: number;
  readonly height: number;
  resize(width: number, height: number): void;
  bindWrite(): void;
  unbind(): void;
  getReadTexture(): WebGLTexture;
  getWriteTexture(): WebGLTexture;
  swap(): void;
  destroy(): void;
};

export function createFBOManager(
  gl: WebGL2RenderingContext,
  initialWidth: number,
  initialHeight: number
): FBOManager {
  let fboA: WebGLFramebuffer | null = null;
  let fboB: WebGLFramebuffer | null = null;
  let textureA: WebGLTexture | null = null;
  let textureB: WebGLTexture | null = null;
  let pingPong = 0;
  let currentWidth = initialWidth;
  let currentHeight = initialHeight;

  const createFBO = (width: number, height: number): [WebGLTexture, WebGLFramebuffer] => {
    const texture = gl.createTexture();

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

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Framebuffer incomplete (${String(width)}x${String(height)})`);
    }

    return [texture, fbo];
  };

  const destroyFBOPair = (): void => {
    if (fboA) gl.deleteFramebuffer(fboA);
    if (fboB) gl.deleteFramebuffer(fboB);
    if (textureA) gl.deleteTexture(textureA);
    if (textureB) gl.deleteTexture(textureB);
    fboA = null;
    fboB = null;
    textureA = null;
    textureB = null;
  };

  const createFBOPair = (width: number, height: number): void => {
    const [tex0, fbo0] = createFBO(width, height);
    const [tex1, fbo1] = createFBO(width, height);

    textureA = tex0;
    fboA = fbo0;
    textureB = tex1;
    fboB = fbo1;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  // Initial creation
  createFBOPair(initialWidth, initialHeight);

  return {
    get width(): number {
      return currentWidth;
    },

    get height(): number {
      return currentHeight;
    },

    resize(width: number, height: number): void {
      if (width === currentWidth && height === currentHeight) return;
      destroyFBOPair();
      createFBOPair(width, height);
      currentWidth = width;
      currentHeight = height;
      pingPong = 0;
    },

    bindWrite(): void {
      const fbo = pingPong === 0 ? fboA : fboB;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, currentWidth, currentHeight);
    },

    unbind(): void {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    },

    getReadTexture(): WebGLTexture {
      const tex = pingPong === 0 ? textureB : textureA;
      if (!tex) throw new Error('FBO not initialized');
      return tex;
    },

    getWriteTexture(): WebGLTexture {
      const tex = pingPong === 0 ? textureA : textureB;
      if (!tex) throw new Error('FBO not initialized');
      return tex;
    },

    swap(): void {
      pingPong = 1 - pingPong;
    },

    destroy(): void {
      destroyFBOPair();
    }
  };
}
