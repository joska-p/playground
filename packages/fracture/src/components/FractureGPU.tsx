import { useEffect, useRef } from 'react';
import fragmentShaderSrc from './shaders/basic.frag';
import vertexShaderSrc from './shaders/basic.vert';

function FractureGPU() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error(
        'Unable to initialize WebGL. Your browser or machine may not support it.'
      );
      return;
    }

    gl.viewport(0, 0, width, height);
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const program = gl.createProgram();
    if (!program) {
      console.error('program cannot be created.');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.error('vertexShader cannot be created.');
      return;
    }
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    gl.attachShader(program, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      console.error('fragmentShader cannot be created.');
      return;
    }
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getShaderInfoLog(vertexShader));
      console.error(gl.getShaderInfoLog(fragmentShader));
    }

    gl.useProgram(program);

    const bufferData = new Float32Array([
      0, 0, 100, 1, 0, 0, 0.5, -0.8, 32, 0, 1, 0, -0.9, 0.5, 50, 0, 0, 1
    ]);

    const aPositionLoc = 0;
    const aPointSizeLoc = 1;
    const aColorLoc = 2;

    gl.enableVertexAttribArray(aPositionLoc);
    gl.enableVertexAttribArray(aPointSizeLoc);
    gl.enableVertexAttribArray(aColorLoc);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aPointSizeLoc, 1, gl.FLOAT, false, 6 * 4, 2 * 4);
    gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

    gl.drawArrays(gl.LINE_LOOP, 0, 3);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
    />
  );
}

export { FractureGPU };
