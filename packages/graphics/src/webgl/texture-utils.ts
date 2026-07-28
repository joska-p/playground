/**
 * Allocates a cols×rows single-channel (RED) WebGL texture and returns it
 * together with the Uint8Array pixel buffer that backs it.
 * The caller is responsible for uploading data with uploadGridTexture() and
 * deleting the texture with gl.deleteTexture() on cleanup.
 */
export function createGridWebGLTexture(
  gl: WebGL2RenderingContext,
  cols: number,
  rows: number
): { texture: WebGLTexture; data: Uint8Array } {
  const data = new Uint8Array(cols * rows);
  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, cols, rows, 0, gl.RED, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return { texture, data };
}

/** Upload updated grid data into an existing texture. */
export function uploadGridTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  data: Uint8Array,
  cols: number,
  rows: number
): void {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, cols, rows, gl.RED, gl.UNSIGNED_BYTE, data);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
