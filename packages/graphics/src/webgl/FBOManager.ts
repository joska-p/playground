export class FBOManager {
  private gl: WebGL2RenderingContext;
  private fboA: WebGLFramebuffer | null = null;
  private fboB: WebGLFramebuffer | null = null;
  private textureA: WebGLTexture | null = null;
  private textureB: WebGLTexture | null = null;
  private pingPong = 0;
  private currentWidth: number;
  private currentHeight: number;

  constructor(gl: WebGL2RenderingContext, width: number, height: number) {
    this.gl = gl;
    this.currentWidth = width;
    this.currentHeight = height;
    this.createFBOPair(width, height);
  }

  private createFBOPair(width: number, height: number): void {
    const gl = this.gl;

    const [tex0, fbo0] = this.createFBO(width, height);
    const [tex1, fbo1] = this.createFBO(width, height);

    this.textureA = tex0;
    this.fboA = fbo0;
    this.textureB = tex1;
    this.fboB = fbo1;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private createFBO(width: number, height: number): [WebGLTexture, WebGLFramebuffer] {
    const gl = this.gl;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    return [texture, fbo];
  }

  resize(width: number, height: number): void {
    if (width === this.currentWidth && height === this.currentHeight) return;
    this.destroy();
    this.createFBOPair(width, height);
    this.currentWidth = width;
    this.currentHeight = height;
    this.pingPong = 0;
  }

  bindWrite(): void {
    const gl = this.gl;
    const fbo = this.pingPong === 0 ? this.fboA : this.fboB;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, this.currentWidth, this.currentHeight);
  }

  unbind(): void {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  getReadTexture(): WebGLTexture {
    const tex = this.pingPong === 0 ? this.textureB : this.textureA;
    if (!tex) throw new Error('FBO not initialized');
    return tex;
  }

  getWriteTexture(): WebGLTexture {
    const tex = this.pingPong === 0 ? this.textureA : this.textureB;
    if (!tex) throw new Error('FBO not initialized');
    return tex;
  }

  swap(): void {
    this.pingPong = 1 - this.pingPong;
  }

  get width(): number {
    return this.currentWidth;
  }

  get height(): number {
    return this.currentHeight;
  }

  destroy(): void {
    const gl = this.gl;
    if (this.fboA) gl.deleteFramebuffer(this.fboA);
    if (this.fboB) gl.deleteFramebuffer(this.fboB);
    if (this.textureA) gl.deleteTexture(this.textureA);
    if (this.textureB) gl.deleteTexture(this.textureB);
    this.fboA = null;
    this.fboB = null;
    this.textureA = null;
    this.textureB = null;
  }
}
